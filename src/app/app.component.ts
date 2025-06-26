import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'HOME', url: '/home', icon: 'home' },
    { title: 'CART', url: '/cart', icon: 'cart' },
    { title: 'WISHLIST', url: '/wishlist', icon: 'heart' },
    { title: 'ORDER_HISTORY', url: '/order-history', icon: 'time' }
  ];

  currentLang = 'el';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('el');
    this.translate.use(this.currentLang);
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'el' : 'en';
    this.translate.use(this.currentLang);
  }
}
