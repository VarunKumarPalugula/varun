import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TabsPageRoutingModule } from './dashboard-tabs.router.module';
import { DashboardTabsPage } from './dashboard-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardTabsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TabsPageRoutingModule
  ],
  declarations: [DashboardTabsPage],
  providers: [
  ],
})
export class DashboardTabsPageModule { }
