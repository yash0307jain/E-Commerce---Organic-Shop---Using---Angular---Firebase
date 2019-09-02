import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../auth-service/auth.service';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  canActivate() {
    return this.authService.appUser$.pipe(map(appUser => appUser.isAdmin));
  }
}
