import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { TranslateService } from '@ngx-translate/core'; 
import { ChartConfiguration } from 'chart.js';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
  standalone: false,
})
export class OrderHistoryPage implements OnInit {
  orders: any[] = [];
  loading = true;
  currentLang: string;

  chartData: ChartConfiguration<'bar'>['data'] | null = null;
  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenditure Overview',
        font: {
          size: 20
        }
      }
    }
  };

  constructor(private firestore: Firestore, private authService: AuthService, private cartService: CartService, private translate: TranslateService , private toastCtrl: ToastController) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();
    this.translate.onLangChange.subscribe(lang => {
      this.currentLang = lang.lang;
    });
  }

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
    this.prepareChartData();
  }

  prepareChartData() {
    if (!this.orders || this.orders.length === 0) {
      this.chartData = null;
      return;
    }

    const now = new Date();
    const lastWeek = new Date(now);
    lastWeek.setDate(now.getDate() - 7);
    const lastMonth = new Date(now);
    lastMonth.setMonth(now.getMonth() - 1);

    let weekTotal = 0;
    let monthTotal = 0;

    for (const order of this.orders) {
      const orderDate = order.date.toDate ? order.date.toDate() : new Date(order.date);
      if (orderDate >= lastWeek) weekTotal += order.total;
      if (orderDate >= lastMonth) monthTotal += order.total;
    }

    this.chartData = {
      labels: ['Last Week', 'Last Month'],
      datasets: [
        {
          label: 'Expenditure (€)',
          data: [weekTotal, monthTotal],
          backgroundColor: ['#36A2EB', '#FFCE56'],
          borderColor: ['#1976d2', '#fbc02d'],
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: ['#1976d2', '#fbc02d'],
          hoverBorderColor: ['#1565c0', '#f9a825']
        }
      ]
    };
  }

  async repeatOrder(order: any) {
    for (const item of order.items) {
      this.cartService.addToCart({
        productId: item.productId || item.title,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      });
    }
    await this.presentToast('Τα προϊόντα προστέθηκαν ξανά στο καλάθι!');
  }

    async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
