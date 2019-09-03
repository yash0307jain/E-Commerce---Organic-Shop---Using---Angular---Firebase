import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private afDb: AngularFireDatabase) {}

  create(product: Product) {
    return this.afDb.list('/product/').push(product);
  }
}
