import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { StorageService } from '../../../services/storage.service';
import { CometChat, User } from "@cometchat-pro/chat"
import { ChatComponent } from '../chat/chat.component';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-chat-orcall',
  templateUrl: './chat-orcall.component.html',
  styleUrls: ['./chat-orcall.component.scss'],
})
export class ChatORcallComponent implements OnInit {
  contacts: any;
  loggedInUser: any;
  private usersRequest: any;
  public userListArray: any = [];
  private limit = 30;
  public userData: User;

  constructor(private navCtrl: NavController, private apiService: ApiService, private storageService: StorageService, private modalController: ModalController,

    private router: Router,

  ) {


  }

  ngOnInit() {
    this.storageService.getItem('userDetails').then(res => {
      this.loggedInUser = JSON.parse(res);
    });
    this.usersRequest = new CometChat.UsersRequestBuilder().setLimit(this.limit).build();
    this.getUserList();
    this.addUserEventListner();

  }

  getUserList() {
    this.usersRequest.fetchNext().then(
      userList => {
        if (userList.length > 0) {
          CometChat.getUnreadMessageCountForAllUsers().then(array => {
            const unread = Object.keys(array);
            if (unread.length > 0) {
              unread.map(uid => {
                const index = userList.findIndex(user => user.uid === uid);
                if (index !== -1) {
                  userList[index].unreadCount = array[uid];
                }
              });
            }
            this.userListArray = userList;
            console.log('UserList Array :', this.userListArray);
          });
        }
      },
      error => {
        console.log('User list fetching failed with error:', error);
      }
    );
  }

  tappedOnItems(event, user) {
    console.log('here tappedOnItems ' + user);
    // tslint:disable-next-line:no-shadowed-variable
    this.userListArray.map(item => {
      if (item.uid === user.uid) {
        item.unreadCount = 0;
      }
    });
    this.userData = user;
    console.log('{{user.name}}');
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.userData
      }
    };
    this.router.navigate(['/dashboard/chat'], navigationExtras);
  }



  back() {
    this.navCtrl.navigateRoot('/chatORcall');
  }


  addUserEventListner() {
    const listenerID = 'UserEventsListnerInList';

    CometChat.addUserListener(
      listenerID,
      new CometChat.UserListener({
        onUserOnline: onlineUser => {
          for (let i = 0; i < this.userListArray.length; i++) {
            if (this.userListArray[i].uid === onlineUser.uid) {
              this.userListArray[i].status = 'Online';
            }
          }

        },
        onUserOffline: offlineUser => {
          for (let i = 0; i < this.userListArray.length; i++) {
            if (this.userListArray[i].uid === offlineUser.uid) {
              this.userListArray[i].status = 'Offline';
            }
          }
        }
      })
    );
  }

  loadNextUsers(event) {
    this.usersRequest.fetchNext().then(
      userList => {
        if (userList !== '') {
          this.userListArray = this.userListArray.concat(userList);
        }
      },
      error => {
      }
    );
  }







}
