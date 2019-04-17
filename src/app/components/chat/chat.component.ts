import {Component, OnChanges, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {User} from '../../services/models/User';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {ChatMessage} from '../../services/models/chatMessage.model';
import {Observable} from 'rxjs';
import {AngularFireList} from '@angular/fire/database';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges{
  users: User[];
  messages: any;
  message: string;
  isOnline: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private chat: ChatService,
              private breakpointObserver: BreakpointObserver) { }


  ngOnInit() {
    this.chat.getUsers().valueChanges().subscribe((users) => {
      this.users = users;
    });
    this.chat.getMessages().valueChanges().subscribe((message) => {
      this.messages = message
    });
  }


  ngOnChanges() {
    this.messages = this.chat.getMessages();
  }

  send() {
    this.chat.sendMessage(this.message);
    this.message = '';
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
