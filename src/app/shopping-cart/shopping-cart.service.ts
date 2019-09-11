import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private afDb: AngularFireDatabase) {}

  private create() {
    return this.afDb.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.afDb
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map(
          (x: { items: { [productId: string]: ShoppingCartItem } }) =>
            new ShoppingCart(x.items)
        )
      );
  }

  private getItem(cartId: string, productId: string) {
    return this.afDb.object(
      '/shopping-carts/' + cartId + '/items/' + productId
    );
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: { product: Product; quantity: number }) => {
        if (item && item.quantity >= 0) {
          item$.update({
            product,
            quantity: item.quantity + change
          });
        } else {
          item$.update({
            product,
            quantity: 1
          });
        }
      });
  }
}
