import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {
  MatSelectModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatRadioModule,
  MatTabsModule,
  MatProgressBarModule
} from '@angular/material';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { RegisterPage } from '../register/register.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
