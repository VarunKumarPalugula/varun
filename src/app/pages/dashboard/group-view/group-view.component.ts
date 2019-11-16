import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { GroupChatService } from 'src/app/services/group-chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
})
export class GroupViewComponent implements OnInit {
  listenerId = 'Web_App_Listener_Group_ID';
  messages = [];
  loggedInUser: any;

  constructor(
    public storageService: StorageService,
    public groupChatService: GroupChatService
  ) { }

  ngOnInit() {
    this.storageService.getItem('userDetails').then(res => {
      this.loggedInUser = JSON.parse(res);
      console.log(this.loggedInUser)
      // this.getMessages().then(_ => this.listenForMessages());

    });

  }

  sendMessage(message: string) {
    this.messages.push({
      text: message,
      sender: { uid: this.loggedInUser.number }
    });
    this.groupChatService.sendMessage(environment.groupId, message);
  }

  getMessages() {
    return this.groupChatService
      .getPreviousMessages(environment.groupId)
      .then(messages => (this.messages = messages))
      .then(console.log, console.error);
  }

  listenForMessages() {
    console.log('registering messages listner');
    this.groupChatService.listenForMessages(this.listenerId, msg => {
      console.log('new message received: ', msg);
      this.messages.push(msg);
    });
  }

  ngOnDestroy(): void {
    this.groupChatService.removeListener(this.listenerId);
  }

}
