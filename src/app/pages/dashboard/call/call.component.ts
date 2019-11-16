import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CometChat, User } from '@cometchat-pro/chat';
import { ModalController, ToastController, NavController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CometChatService } from '../../../services/comet-chat.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
})
export class CallComponent implements OnInit {
 
  public contacts: Observable<any[]> = this.chat.getUsers();
  public incomingCall$: Observable<any> = this.chat.getIncomingCalls();
  public ongoingCall$: Observable<any> = this.chat.getOngoingCalls();
 public outgoingCall$: Observable<any> = this.chat.getOutgoingCalls();
 
 constructor(private chat: CometChatService) { }

 ngOnInit() {
 }

  public voiceCall(userId: string):void {
    this.chat.startVoiceCall(userId).subscribe();
  }

  public videoCall(userId: string):void {
    this.chat.startVideoCall(userId).subscribe();
  }


}
