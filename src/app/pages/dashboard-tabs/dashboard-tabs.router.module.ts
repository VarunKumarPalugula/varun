import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTabsPage } from './dashboard-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardTabsPage,
    children: [
      {
        path: 'dashboard',
            loadChildren: () =>
              import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'createShop',
            loadChildren: () =>
              import('./create-shop/create-shop.module').then(m => m.CreateShopPageModule)
      },
      {
        path: 'profile',
            loadChildren: () =>
              import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'itemlist',
            loadChildren: () =>
              import('./item-list/item-list.module').then(m => m.ItemListPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
