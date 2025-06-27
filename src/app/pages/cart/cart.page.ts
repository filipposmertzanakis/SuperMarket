import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from 'src/app/services/cart.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;
  currentLang: string;

  constructor(private cartService: CartService, private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();
    this.translate.onLangChange.subscribe(lang => {
      this.currentLang = lang.lang;
    });
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  updateQuantity(item: CartItem, event: any) {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity)) {
      this.cartService.updateQuantity(item.productId, quantity);
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item.productId);
  }

  checkout() {
    alert('Proceeding to checkout');
  }
}
