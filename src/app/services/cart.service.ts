import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];
  private cart$ = new BehaviorSubject<CartItem[]>([]);

  getCart() {
    return this.cart$.asObservable();
  }

  addToCart(item: CartItem) {
    const index = this.items.findIndex(i => i.productId === item.productId);
    if (index > -1) {
      this.items[index].quantity += item.quantity;
    } else {
      this.items.push(item);
    }
    this.cart$.next(this.items);
  }

  updateQuantity(productId: string, quantity: number) {
    const index = this.items.findIndex(i => i.productId === productId);
    if (index > -1) {
      if (quantity <= 0) {
        this.items.splice(index, 1);
      } else {
        this.items[index].quantity = quantity;
      }
      this.cart$.next(this.items);
    }
  }

  removeItem(productId: string) {
    this.items = this.items.filter(i => i.productId !== productId);
    this.cart$.next(this.items);
  }

  clearCart() {
    this.items = [];
    this.cart$.next(this.items);
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
