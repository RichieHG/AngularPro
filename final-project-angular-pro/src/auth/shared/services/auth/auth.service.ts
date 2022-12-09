import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, tap } from 'rxjs';
import { Store } from 'src/store';

export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}

@Injectable()
export class AuthService {

  private _user?: firebase.default.User | null;


  get user(){
    return this._user!;
   }

  set user(value: firebase.default.User){
    this._user = value;
  }

  auth$ = this.af.authState.pipe(
    tap((next: any) => {
      if(!next){
        this.store.set('user', null);
        return;
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };
      this.store.set('user', user)
    })
  );
  constructor(
    private af: AngularFireAuth,
    private store: Store
  ) {
    this.getUser();
   }

  createUser(email: string, password: string){
    return this.af.createUserWithEmailAndPassword(email,password);
  }

  loginUser(email:string, password: string){
    return this.af.signInWithEmailAndPassword(email,password);
  }

  logoutUser(){
    return this.af.signOut();
  }

  get authState(){
    return this.af.authState;
  }

   getUser(){
    this.af.user.subscribe((user) =>{
      this._user = user;
    });
  }



}
