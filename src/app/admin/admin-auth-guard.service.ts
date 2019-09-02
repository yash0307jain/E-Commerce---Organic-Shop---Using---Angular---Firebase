import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth-service/auth.service';
import { UserService } from '../user-service/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  canActivate() {
    this.authService.user$;
  }
}
