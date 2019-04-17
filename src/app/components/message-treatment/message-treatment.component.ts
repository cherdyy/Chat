import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatMessage} from '../../services/models/chatMessage.model';
import {AuthserviceService} from '../../services/authservice.service';

@Component({
  selector: 'app-message-treatment',
  templateUrl: './message-treatment.component.html',
  styleUrls: ['./message-treatment.component.scss']
})
export class MessageTreatmentComponent implements OnInit {

  /**
   * get message's info from chat.component.ts
   * @type {ChatMessage}
   */
  @Input() chatMessage: ChatMessage;
  /**
   * user's email
   * @type {string}
   */
  userEmail: string;
  /**
   * user's userName
   * @type {string}
   */
  userName: string;
  /**
   * content of message
   * @type {string}
   */
  messageContent: string;
  /**
   * current date
   * @type {object}
   */
  timeStamp: Date = new Date();
  /**
   * check is message own
   * @type {boolean}
   */
  isOwnMessage: boolean;
  /**
   * check is email own
   * @type {string}
   */
  ownEmail: string;

  /**
   * @ignore
   * @param auth
   */
  constructor(private auth: AuthserviceService) {
      auth.authUser().subscribe(user => {
      this.ownEmail = user.email;
      if (this.ownEmail === this.userEmail){
        this.isOwnMessage = true;
      }
      else {
        this.isOwnMessage = false;
      }
    });

  }

  /**
   * @ignore
   */
  ngOnInit() {
    this.messageContent = this.chatMessage.message;
    this.timeStamp = this.chatMessage.timeSent;
    this.userEmail = this.chatMessage.email;
    this.userName = this.chatMessage.userName;
  }

}
