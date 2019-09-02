import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { AppUser } from '../models/app-user.model';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;

  constructor(private authService: AuthService) {
    authService.appUser$.subscribe(appUser => (this.appUser = appUser));
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
