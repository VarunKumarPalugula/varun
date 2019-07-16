import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';
import { LoginRegistorPage } from './login-registor.page';
import { RegistorComponent } from './registor/registor.component';
const routes: Routes = [
  { path: '', redirectTo: 'login',  pathMatch: 'full' },
  { path: 'login', component : LoginComponent },
  { path: 'registor', component : RegistorComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginRegistorPage, LoginComponent, RegistorComponent]
})
export class LoginRegistorPageModule {}
