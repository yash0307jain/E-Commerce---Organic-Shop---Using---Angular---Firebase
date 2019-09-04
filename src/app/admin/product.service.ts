import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private afDb: AngularFireDatabase) {}

  create(product: Product) {
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
}
