import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryKey = [];
  private categoryName = [];

  constructor(private afDb: AngularFireDatabase) {}

  getCategories() {
    return this.afDb.list('/categories').valueChanges();
  }
}
