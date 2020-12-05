import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import firebase from "firebase/app";
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user;
  user$ = this.afAuth.authState;
  islogged:boolean;
  constructor(private router: Router,
              private route:ActivatedRoute,
              private afAuth: AngularFireAuth) {
    this.user$.subscribe(async user => {
    if (user) {
      this.user = user;
      this.islogged=true;
    }else{
      this.islogged=false;
    }

  })
               }

  ngOnInit(): void {
  }

  onSearch(value: string) {
    console.log('Buscar--->', value);
    //ESTO DE ABAJO QUIERE DECIR QUE A PARTIR DEL CARACTER 4 ES QUE ENVIARA LAS PETICIONES A LA API
    if (value && value.length > 3) {
      this.router.navigate(['/character-list'], { queryParams: { q: value } });
    }
}

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
  }

  logout() {
    this.afAuth.signOut();
    window.location.reload();
  }

}
