import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  user: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {
    this.user = afAuth.authState;
  }

  authUser() {
    return this.user;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.user.uid : '';
  }

  login( {userLogin, userPassword} ) {
    return this.afAuth.auth.signInWithEmailAndPassword(userLogin, userPassword)
      .then((user) => {
        this.authState = user;
        this.setUserStatus(true);
        this.router.navigate(['blog']);
      });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => this.router.navigate(['sign-in'])
        .then(() => this.setUserStatus(false)));
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        const photoUrl = 'https://i.stack.imgur.com/34AD2.jpg';
        this.setUserData(email, displayName, status, photoUrl);
      }).catch(error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string, photoUrl: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status,
      photoUrl: photoUrl
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: boolean): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      status: status
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }


  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    return await this.afAuth.auth.signInWithPopup(provider)
      .then((crendetial) => {
        const email: string = crendetial.user.email;
        const displayName: string = crendetial.user.displayName;
        const photoUrl: string = crendetial.user.photoURL;
        const status = 'online';
        this.authState = crendetial;
        this.setUserData(email, displayName, status, photoUrl);
        this.router.navigate(['profile']);
      })
  }

}
