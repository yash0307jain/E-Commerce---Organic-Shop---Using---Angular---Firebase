import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryKey = [];
  private categoryName = [];

  constructor(private afDb: AngularFireDatabase) {}

  getCategories() {
    return this.afDb
      .list('categories')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() })))
      );
  }
}
