import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false
})
export class ProductDetailPage implements OnInit {
  productId: string | null = null;
  product: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    this.productId = this.route.snapshot.paramMap.get('id');
    // 🔁 Για τώρα μπορούμε να βάλουμε mock δεδομένα. Αργότερα θα φέρνουμε από βάση.
    this.product = {
      id: this.productId,
      name: 'Γάλα 1L',
      description: 'Φρέσκο γάλα αγελάδος.',
      image: 'https://via.placeholder.com/300x200',
      price: 1.20,
      unit: '€/τεμάχιο',
      available: true,
      nutrition: 'Πρωτεΐνη, Ασβέστιο, Βιταμίνη D',
    };
  }
}