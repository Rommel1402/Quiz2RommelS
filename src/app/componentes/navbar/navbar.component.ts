import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import firebase from "firebase/app";
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user;
  user$ = this.afAuth.authState;
  isLogged:boolean;
  constructor(private router: Router,
              private route:ActivatedRoute,
              private afAuth: AngularFireAuth,
              private authS:AuthService) {
    this.user$.subscribe(async user => {
    if (user) {
      this.user = user;
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
    
  })
               }

  ngOnInit(): void {
  }

  onSearch(value: string) {
    console.log('Buscar--->', value);
    //ESTO DE ABAJO QUIERE DECIR QUE A PARTIR DEL CARACTER 4 ES QUE ENVIARA LAS PETICIONES A LA API
    if (value && value.length > 3) {
      this.router.navigate(['/'], { queryParams: { q: value } });
      
    }
}

  login() {
    this.authS.login();
    // let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    // localStorage.setItem("returnUrl", returnUrl);

    // this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    


  }

  logout() {
    // this.afAuth.signOut();
    // window.location.reload();
    this.authS.logout();
  }

}
