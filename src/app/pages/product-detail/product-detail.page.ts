import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false
})
export class ProductDetailPage implements OnInit {
  productId: string | null = null;
  product: any = null;

  constructor(private route: ActivatedRoute , private firestoreService: FirestoreService , private cartService: CartService) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.firestoreService.getProductById(this.productId).subscribe(product => {
          this.product = product;
          console.log('Product details:', this.product);
        });
      }
    });

    

    

    

  }

  addToCart() {
  if (!this.product) return;

  this.cartService.addToCart({
    productId: this.productId!,
    title: this.product.title,
    price: this.product.price,
    quantity: 1
  });

  alert(`${this.product.title} προστέθηκε στο καλάθι!`);
}

}