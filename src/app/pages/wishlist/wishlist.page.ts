import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AuthService } from 'src/app/services/auth.service';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core'; 

interface Product {
  id: string;
  title: { [lang: string]: string };
  price: number;
  availability: boolean;
  description: { [lang: string]: string };
  stock: number;
  category: string;
}

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
  standalone: false,
})
export class WishlistPage implements OnInit {
  userId: string | null = null;
  wishlistProductIds: string[] = [];
  products: Product[] = [];
  loading = true;
  currentLang: string;

  constructor(
    private wishlistService: WishlistService,
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router,
    private translate: TranslateService
  ) {this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();
    this.translate.onLangChange.subscribe(lang => {
      this.currentLang = lang.lang;
    });}

async ngOnInit() {
  try {
    const user = await firstValueFrom(this.authService.getUser());
    this.userId = user?.uid || null;
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.wishlistProductIds = await this.wishlistService.getWishlist(this.userId);
    if (this.wishlistProductIds.length === 0) {
      this.loading = false;
      return;
    }

    const productsRef = collection(this.firestore, 'products');
    collectionData(productsRef, { idField: 'id' }).subscribe((allProducts: Product[]) => {
      this.products = allProducts.filter(p => this.wishlistProductIds.includes(p.id));
      this.loading = false;
    });
  } catch (error) {
    console.error('Error loading wishlist:', error);
    this.loading = false;
  }
}

  async remove(productId: string) {
    if (!this.userId) return;
    await this.wishlistService.removeFromWishlist(this.userId, productId);
    this.products = this.products.filter(p => p.id !== productId);
  }
}
