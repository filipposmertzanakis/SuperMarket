import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core'; 

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false
})

export class ProductDetailPage implements OnInit {
  productId: string | null = null;
  product: any = null;
  currentLang: string;

  constructor(private route: ActivatedRoute , private firestoreService: FirestoreService , private wishlistService: WishlistService, private cartService: CartService , private authService: AuthService ,  private toastCtrl: ToastController, private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();
    this.translate.onLangChange.subscribe(lang => {
      this.currentLang = lang.lang;
    });
  }

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

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  addToWishlist(productId: string) {
    this.authService.getUser().subscribe(async user => {
      if (!user) {
        await this.presentToast('Πρέπει να είστε συνδεδεμένοι για να προσθέσετε στη λίστα επιθυμιών.');
        return;
      }

      await this.presentToast('Προσθήκη στη λίστα επιθυμιών...');
      await this.wishlistService.addToWishlist(user.uid, productId);
      await this.presentToast('Το προϊόν προστέθηκε στη λίστα επιθυμιών!');
    });
  }

}