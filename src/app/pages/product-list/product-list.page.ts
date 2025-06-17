import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: false})
export class ProductListPage implements OnInit {
  products: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.products = [
      {
        id: '1',
        name: 'Γάλα 1L',
        price: 1.2,
        image: 'https://via.placeholder.com/150x100',
        available: true,
        category: 'Γαλακτοκομικά',
      },
      {
        id: '2',
        name: 'Μήλα Κιλό',
        price: 1.8,
        image: 'https://via.placeholder.com/150x100',
        available: false,
        category: 'Φρούτα',
      },
      {
        id: '3',
        name: 'Ψωμί Τοστ',
        price: 1.5,
        image: 'https://via.placeholder.com/150x100',
        available: true,
        category: 'Αρτοσκευάσματα',
      },
    ];
  }

  goToProduct(productId: string) {
    this.router.navigate(['/product-detail', productId]);
  }
}
