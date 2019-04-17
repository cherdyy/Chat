import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatMessage} from '../../services/models/chatMessage.model';
import {AuthserviceService} from '../../services/authservice.service';

@Component({
  selector: 'app-message-treatment',
  templateUrl: './message-treatment.component.html',
  styleUrls: ['./message-treatment.component.scss']
})
export class MessageTreatmentComponent implements OnInit {

  @Input() chatMessage: ChatMessage;

  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;

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


  ngOnInit() {
    this.messageContent = this.chatMessage.message;
    this.timeStamp = this.chatMessage.timeSent;
    this.userEmail = this.chatMessage.email;
    this.userName = this.chatMessage.userName;
  }

}
