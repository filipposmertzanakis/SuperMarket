import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';
  message = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService // <-- Add this
  ) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.message = '✅ ' + this.translate.instant('LOGIN_SUCCESS');
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error(error);
      this.message = `❌ ${error.message}`;
    }
  }
}
