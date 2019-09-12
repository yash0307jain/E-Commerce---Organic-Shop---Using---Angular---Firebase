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

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.afDb.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.afDb.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
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

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: { product: Product; quantity: number }) => {
        if (item) {
          const quantity = item.quantity + change;
          if (quantity === 0) {
            item$.remove();
          } else {
            item$.update({
              key: product.key,
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price,
              quantity: quantity
            });
          }
        } else {
          item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: 1
          });
        }
      });
  }
}
