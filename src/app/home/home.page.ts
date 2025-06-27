import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

interface Product {
  id: string;
  title: any;
  description: any;
  price: number;
  availability: boolean;
  stock: number;
  category: string;
  imageUrl?: string;
  discount?: boolean; // <-- added discount field
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  isLoggedIn = false;
  userEmail = '';

  products$: Observable<Product[]> | undefined;
  allProducts: Product[] = []; // keep all loaded products here
  filteredProducts: Product[] = [];

  categories = ['All', 'Fresh', 'Dairy', 'Frozen', 'Cleaning'];
  selectedCategory = 'All';

  sortOrder: 'asc' | 'desc' = 'asc';

  currentLang: string;

  // New properties for filtering & search
  searchTerm: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  filterDiscountOnly: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore,
    private menu: MenuController,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();
    this.translate.onLangChange.subscribe(lang => {
      this.currentLang = lang.lang;
    });
  }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.userEmail = user?.email || '';
    });

    const productsRef = collection(this.firestore, 'products');
    this.products$ = collectionData(productsRef, { idField: 'id' }) as Observable<Product[]>;
    this.products$.subscribe(products => {
      this.allProducts = products;
      this.applyFilters();
    });
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Combined filter function
  applyFilters() {
    this.filteredProducts = this.allProducts.filter(p => {
      // Category filter
      const categoryMatch = this.selectedCategory === 'All' || p.category === this.selectedCategory;

      // Price filter
      const priceMatch =
        (this.minPrice === null || p.price >= this.minPrice) &&
        (this.maxPrice === null || p.price <= this.maxPrice);

      // Discount filter
      const discountMatch = !this.filterDiscountOnly || (p.discount === true);

      // Search filter - search in title and description in current language
      const titleText = (p.title && p.title[this.currentLang]) ? p.title[this.currentLang].toLowerCase() : '';
      const descText = (p.description && p.description[this.currentLang]) ? p.description[this.currentLang].toLowerCase() : '';
      const searchLower = this.searchTerm.toLowerCase();
      const searchMatch = !this.searchTerm || titleText.includes(searchLower) || descText.includes(searchLower);

      return categoryMatch && priceMatch && discountMatch && searchMatch;
    });

    this.sortProducts();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  sortProducts() {
    this.filteredProducts.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  // Call this on user input changes for search, minPrice, maxPrice, discount checkbox, etc.
  onSearchTermChange(term: string) {
    this.searchTerm = term;
    this.applyFilters();
  }

onMinPriceChange(value: string | null | undefined) {
  const parsed = parseFloat(value ?? '');
  this.minPrice = isNaN(parsed) ? null : parsed;
  this.applyFilters();
}

onMaxPriceChange(value: string | null | undefined) {
  const parsed = parseFloat(value ?? '');
  this.maxPrice = isNaN(parsed) ? null : parsed;
  this.applyFilters();
}

  onDiscountToggle(value: boolean) {
    this.filterDiscountOnly = value;
    this.applyFilters();
  }
}
