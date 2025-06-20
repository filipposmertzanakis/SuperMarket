import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
  standalone: false,
})
export class OrderHistoryPage implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(private firestore: Firestore, private authService: AuthService) {}

  async ngOnInit() {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.loading = false;
      return;
    }

    const ordersRef = collection(this.firestore, 'orders');
    const q = query(ordersRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);

    this.orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    this.loading = false;
  }
}
