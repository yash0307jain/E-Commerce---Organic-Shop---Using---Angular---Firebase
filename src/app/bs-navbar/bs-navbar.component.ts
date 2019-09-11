import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { AppUser } from '../models/app-user.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => (this.appUser = appUser));
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.authService.logout();
  }
}
