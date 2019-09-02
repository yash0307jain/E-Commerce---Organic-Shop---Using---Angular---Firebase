import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afDb: AngularFireDatabase) {}

  save(user: firebase.User) {
    this.afDb.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.afDb.object('/users/' + uid);
  }
}
