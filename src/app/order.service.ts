import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private afDb: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  placeOrder(order) {
    const result = this.afDb.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.afDb.list('/orders').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.afDb
      .list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .valueChanges();
  }
}
