import { Component } from '@angular/core';
import { AuthService } from './auth-service/auth.service';
import { Router } from '@angular/router';
import { UserService } from './user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    userService: UserService,
    authService: AuthService,
    router: Router
  ) {
    authService.user$.subscribe(user => {
      if (!user) {
        return;
      }
      userService.save(user);
      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) {
        return;
      }
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
