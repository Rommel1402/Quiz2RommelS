import { Component, Input, OnInit } from '@angular/core';
import { Personaje } from 'src/app/personaje';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Inject, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonajesAPIService } from '../../servicios/personajes-api.service';
import { NavigationEnd, ParamMap } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
import { AngularFireDatabase } from '@angular/fire/database';
import { HostListener } from '@angular/core';
import { FavoritosService } from 'src/app/servicios/favoritos.service';


@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  @Input('character') character:Personaje;
  user;
  user$ = this.afAuth.authState;
  islogged:boolean;
  constructor(private characterService: PersonajesAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private afAuth: AngularFireAuth,
    @Inject(DOCUMENT) private document: Document,
    private db: AngularFireDatabase,
    private fvS: FavoritosService) { 
    this.user$.subscribe(async (user) => {
      if (user) {
        this.user = user;
        this.islogged = true;

    
        
          if (await fvS.existe2(this.character, user) == true) {
            this.character.isLiked = true;
            // this.isLiked = true;
          } else {
            this.character.isLiked = false;
            // this.isLiked = false;
          }

        


      } else {
        this.islogged = false;
      }
    })
    }

  ngOnInit(): void {
  }
  addToWL(product) {
    this.fvS.addToWL(product, this.user);
  }

  deleteToWL(product) {
    this.fvS.deleteTWL(product, this.user);
  }

  like(character) {
    character.isLiked = !character.isLiked;
    console.log(character.isLiked);
    // this.isLiked = !this.isLiked;

    if (character.isLiked) {
      this.addToWL(character);
      this.characterService.create(character);

    } else {
      this.deleteToWL(character);
    }
  }

}
