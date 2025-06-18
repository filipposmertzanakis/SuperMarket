import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: false,
 
})
export class ProductListPage implements OnInit {
  products: any[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.getProducts().subscribe(data => {
      this.products = data;
      console.log(data);
      console.log(this.products);
    });
  }
}