import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private afDb: AngularFireDatabase) {}

  create(product) {
    return this.afDb.list('/products/').push(product);
  }

  getAll() {
    return this.afDb
      .list('products')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() })))
      );
  }

  getProduct(productId) {
    return this.afDb.object('/products/' + productId).valueChanges();
  }

  updateProduct(productId, product) {
    return this.afDb.object('/products/' + productId).update(product);
  }

  deleteProduct(productId) {
    return this.afDb.object('/products/' + productId).remove();
  }
}
