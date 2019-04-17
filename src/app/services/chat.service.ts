import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {ChatMessage} from './models/chatMessage.model';

import * as firebase from 'firebase/app';
import {User} from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /**
   * user's data
   * @type {firebase.User}
   */
  user: firebase.User;
  /**
   * all messages from firebase
   * @type {any}
   */
  chatMessages: any;
  /**
   * user's userName
   * @type {string}
   */
  userName: string;

  /**
   * @ignore
   * @param db
   * @param afAuth
   */

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().valueChanges().subscribe((a: User) => {
        this.userName = a.displayName;
      });
    });

  }

  /**
   * get current user
   */
  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    console.log(this.db.object(path));
    return this.db.object(path);
  }

  /**
   * get all users from firebase
   */
  getUsers() {
    const path = '/users';
    console.log(this.db.list(path));
    return this.db.list(path);
  }

  /**
   * save and send message to firebase
   * @param msg
   */
  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: email,
      photoURL: this.user.photoURL});
  }

  /**
   * get all message from firebase
   * @type {AngularFireList<ChatMessage[]>}
   */
  getMessages(): AngularFireList<ChatMessage[]> {
    return this.db.list('/messages', ref => {
      const q = ref.orderByKey().limitToLast(25);
      return q;
    }
  );
  }

  /**
   * get current date
   */
  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();
    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();

    return (date + ' ' + time);
  }

}
