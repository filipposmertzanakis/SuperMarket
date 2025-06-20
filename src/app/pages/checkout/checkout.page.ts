import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from 'src/app/services/cart.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: false,
})
export class CheckoutPage implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  customer = {
    name: '',
    email: ''
  };

  loading = false;
  message = '';

  constructor(private cartService: CartService, private firestore: Firestore , private authService: AuthService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  async completeOrder() {
    if (!this.customer.name || !this.customer.email || this.cartItems.length === 0) {
      this.message = '❌ Συμπληρώστε όλα τα πεδία!';
      return;
    }

    const userId = this.authService.getUserId();

    
    this.loading = true;

    const order = {
      userId,
      customer: this.customer,
      items: this.cartItems,
      total: this.total,
      date: new Date()
    };

    try {

      const ordersRef = collection(this.firestore, 'orders');
      await addDoc(ordersRef, order);

      this.cartService.clearCart();
      this.message = '✅ Η παραγγελία καταχωρήθηκε επιτυχώς!';
      this.customer = { name: '', email: '' };
    } catch (error) {
      console.error(error);
      this.message = '❌ Σφάλμα κατά την αποθήκευση της παραγγελίας.';
    }

    this.loading = false;
  }
}
