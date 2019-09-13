import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { OrderService } from '../order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.orders$ = authService.user$.pipe(
      switchMap(u => orderService.getOrdersByUser(u.uid))
    );
  }

  ngOnInit() {}
}
