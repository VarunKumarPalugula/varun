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

import { LandingPage } from './landing.page';
import { LoginPage } from '../auth/login/login.page';
import { RegisterPage } from '../auth/register/register.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
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
  declarations: [LandingPage, LoginPage, RegisterPage],
  entryComponents: [LoginPage, RegisterPage]
})
export class LandingPageModule {}
