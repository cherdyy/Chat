import {Component, OnChanges, OnInit} from '@angular/core';

import {ChatService} from '../../services/chat.service';
import {User} from '../../services/models/User';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {
  /**
   * user's data
   * @type {User[]}
   */
  users: User[];
  /**
   * all messages from firebase
   * @type {any}
   */
  messages: any;
  /**
   * user's message
   * @type {string}
   */
  message: string;
  /**
   * check is resolution like handset
   */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  /**
   * @ignore
   * @param chat
   * @param breakpointObserver
   */
  constructor(private chat: ChatService,
              private breakpointObserver: BreakpointObserver) { }

  /**
   * @ignore
   */
  ngOnInit() {
    this.chat.getUsers().valueChanges().subscribe((users) => {
      this.users = users;
    });
    this.chat.getMessages().valueChanges().subscribe((message) => {
      this.messages = message
    });
  }

  /**
   * @ignore
   */
  ngOnChanges() {
    this.messages = this.chat.getMessages();
  }

  /**
   * save and send message to firebase
   */
  send() {
    this.chat.sendMessage(this.message);
    this.message = '';
  }

  /**
   * send and save message to firebase on click 'enter'
   * @param event
   */
  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
