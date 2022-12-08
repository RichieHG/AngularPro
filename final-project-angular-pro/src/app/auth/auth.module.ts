import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Route, RouterModule } from '@angular/router';
import { FirebaseOptions } from 'firebase/app';
import { SharedModule } from './shared/shared.module';

export const ROUTES: Route[] = [
  {
    path: 'auth',
    children:[
      {
        path:'',
        pathMatch:'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      }
    ]
  }
]

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyB3W1yDjQxcdRYj3o6Ik8PNpVonHt7GH38",
  authDomain: "fitness-app-f2ba2.firebaseapp.com",
  databaseURL: "https://fitness-app-f2ba2-default-rtdb.firebaseio.com",
  projectId: "fitness-app-f2ba2",
  storageBucket: "fitness-app-f2ba2.appspot.com",
  messagingSenderId: "587831379118",
  appId: "1:587831379118:web:ec0fda3a9ad4549d32593f",
  measurementId: "G-YQZ30BZMHB"
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule { }
