import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { ChatORcallComponent } from './chat-orcall/chat-orcall.component';
import { ChatComponent } from './chat/chat.component';
import { CallComponent } from './call/call.component';
import { OutgoingCallComponent } from './outgoing-call/outgoing-call.component';
import { IncomingCallComponent } from './incoming-call/incoming-call.component';
import { OngoingCallComponent } from './ongoing-call/ongoing-call.component';
import { GroupViewComponent } from './group-view/group-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  {
    path: 'chatORcall',
    component: ChatORcallComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'call',
    component: CallComponent
  },
  {
    path: 'group-list',
    component: GroupViewComponent
  },
  {
    path: 'ongoing-cal',
    component: OngoingCallComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage, GroupViewComponent, ChatORcallComponent, ChatComponent,
     CallComponent, OutgoingCallComponent, IncomingCallComponent , OngoingCallComponent],
  entryComponents: [ChatComponent],
  providers: []
})
export class DashboardPageModule { }
