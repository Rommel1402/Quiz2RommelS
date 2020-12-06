import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import firebase from "firebase/app";
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData$: Observable<firebase.User>;
  private filePath: string;
user;
  constructor( private storage: AngularFireStorage,
    private http: HttpClient,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,) {
    this.userData$ = afAuth.authState;
  }

  // loginByEmail(user) {
  //   const { email, password } = user;
  //   return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  // }

  // logout() {
  //   this.afAuth.auth.signOut();
  // }
  
  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }

  logout() {
    this.afAuth.signOut();
    window.location.reload();
  }

  

  // private saveUserProfile(user: UserI) {
  //   this.afAuth.auth.currentUser.updateProfile({
  //     displayName: user.displayName,
  //     photoURL: user.photoURL
  //   })
  //     .then(() => console.log('User updated!'))
  //     .catch(err => console.log('Error', err));
  // }

}