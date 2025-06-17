import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Αρχική', url: '/home', icon: 'home' },
    { title: 'Λίστα Αγορών', url: '/cart', icon: 'cart' },
    { title: 'Λίστα Επιθυμιών', url: '/wishlist', icon: 'heart' },
    { title: 'Ιστορικό Αγορών', url: '/history', icon: 'time' }
  ];

  constructor() {}
}
