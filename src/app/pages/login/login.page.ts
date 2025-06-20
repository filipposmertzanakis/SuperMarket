import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.message = '✅ Είσοδος επιτυχής!';
      this.router.navigate(['/']); // ή όπου θες
    } catch (error: any) {
      console.error(error);
      this.message = `❌ ${error.message}`;
    }
  }
}
