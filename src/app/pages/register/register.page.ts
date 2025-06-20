import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.message = '✅ Εγγραφή επιτυχής!';
      this.router.navigate(['/']); // πήγαινε αρχική
    } catch (error: any) {
      console.error(error);
      this.message = `❌ ${error.message}`;
    }
  }
}
