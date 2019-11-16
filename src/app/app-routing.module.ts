import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LandingComponent, FqaComponent } from './index';
import { AuthService } from './auth.service';

// const routes: Routes = [  
//   { path: '', redirectTo: 'landing', pathMatch: 'full' },  
//   { path: 'landing', component: LandingComponent, canActivate: [AuthService]  },
//   { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' , canActivate: [AuthService]},
//   { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' , canActivate: [AuthService] },
//   { path: 'forgot-password', loadChildren: './pages/auth/forgot-password/forgot-password.module#ForgotPasswordPageModule' , canActivate: [AuthService] },
//   { path: 'dashboard-tabs', loadChildren: './pages/dashboard-tabs/dashboard-tabs.module#DashboardTabsPageModule' , canActivate: [AuthService]},
// ];

const routes: Routes = [  
  { path: '', redirectTo: 'landing', pathMatch: 'full' },  
  { path: 'landing', component: LandingComponent  },
  { path: 'fqa', component: FqaComponent  },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule'  },
  { path: 'forgot-password', loadChildren: './pages/auth/forgot-password/forgot-password.module#ForgotPasswordPageModule'  },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
