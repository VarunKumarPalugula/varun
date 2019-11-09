import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { ChatORcallComponent } from './chat-orcall/chat-orcall.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  {
    path: 'chatORcall',
    component: ChatORcallComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage, ChatORcallComponent]
})
export class DashboardPageModule {}
