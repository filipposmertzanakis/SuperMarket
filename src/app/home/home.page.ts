import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  availability: boolean;
  stock: number;
  category: string;
    imageUrl?: string;
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
  filteredProducts: Product[] = [];
  categories = ['All', 'Fresh', 'Dairy', 'Frozen', 'Cleaning'];
  selectedCategory = 'All';

  constructor(private authService: AuthService, private router: Router, private firestore: Firestore, private menu: MenuController ) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.userEmail = user?.email || '';
    });

    const productsRef = collection(this.firestore, 'products');
    this.products$ = collectionData(productsRef, { idField: 'id' }) as Observable<Product[]>;
    this.products$.subscribe(products => {
      this.filteredProducts = products;
    });
  }

  ionViewWillEnter() {
  this.menu.enable(true); // <- enables menu when user navigates to home
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

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.products$?.subscribe(products => {
      if (category === 'All') {
        this.filteredProducts = products;
      } else {
        this.filteredProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
    });
  }
}
