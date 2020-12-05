import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonajesAPIService } from '../personajes-api.service';
import { NavigationEnd, ParamMap } from '@angular/router';
import { Personaje } from '../personaje';
import { filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
import { AngularFireDatabase } from '@angular/fire/database';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.scss']
})
export class ListaPersonajesComponent implements OnInit {
  showGoUpButton = false;
  characters: Personaje[] = [];
  info = {
    next: null,
  };
  private pageNum = 1;
  private query: string;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;
  isLiked = false;
  user;
  // user$: Observable<firebase.User>;
  user$ = this.afAuth.authState;

  logged = false;
  role;
  available: boolean = false;
  
  constructor(private characterService: PersonajesAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private afAuth: AngularFireAuth,
    @Inject(DOCUMENT) private document: Document,
    private db: AngularFireDatabase) {


    // this.onUrlChanged();

    this.user$.subscribe(async user => {
      if (user) {
        this.user = user;

        // for (let index = 0; index < this.characters.length; index++) {
        //   const element = this.characters[index];
        //   if (await characterService.existe2(this.characters[index], user) == true) {
        //     this.characters[index].isLiked = true;
        //   } else {
        //     this.characters[index].isLiked = false;
        //   }

        // }

        this.onUrlChanged();



        // if (await characterService.existe2(this.product, user) == true) {
        //   character.isLiked = true;
        // } else {
        //   character.isLiked = false;
        // }


        // DEBO ENCONTRAR UNA MANERA PARA QUE DEL HTML DE ESTE COMPONENTE PUEDA OBJETER EL PERSONAJE Y PASARLO POR PARAMETRO AQUI ABAJO
        // if (await characterService.existe2(this.character, user) == true) {
        //   this.isLiked = true;
        // } else {
        //   this.isLiked = false;
        // }

        for (let index = 0; index < this.characters.length; index++) {
          const element = this.characters[index];
          // console.log(element);
          if (await characterService.existe2(this.characters[index], user) == true) {
            this.characters[index].isLiked=true;
          // this.isLiked = true;
        } else {
            this.characters[index].isLiked = false;
          // this.isLiked = false;
        }

        }

      }

    })
  }

  

  async ngOnInit() {
    // this.getDataFromService();
    this.getCharactersByQuery();

    this.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.logged = true;
        this.getRole(user.uid).valueChanges().subscribe(role => {
          if (!role) {
            this.createRole(user.uid);
            return this.role = "user";
          }
          this.role = role;
        })

      }
    })
  }

  private onUrlChanged(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)).subscribe(
        () => {
          this.characters = [];
          this.pageNum = 1;
          this.getCharactersByQuery();
        }
      )

  }

  @HostListener('window:scroll', [])

  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;

    if ((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {

      this.showGoUpButton = true;

    } else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {

      this.showGoUpButton = false;

    }

    
  }



  onScrollDown(): void {
    if (this.info.next) {
      this.pageNum++;
      this.getDataFromService();
    }
  }

  onScrollTop(): void {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(
      take(1)).subscribe((params: ParamMap) => {
        console.log('Params', params);
        this.query = params['q'];
        this.getDataFromService();
      });

  }

  private getDataFromService(): void {

    this.characterService.searchCharacters(this.query, this.pageNum).pipe(take(1))
      .subscribe((res: any) => {
        if (res?.results?.length) {
          console.log('Response==>', res);
          const { info, results } = res;
          this.characters = [... this.characters, ...results]
          this.info = info;
        } else {
          this.characters = [];
        }
      });


  }

  addToWL(product) {
    this.characterService.addToWL(product, this.user);
  }

  deleteToWL(product) {
    this.characterService.deleteTWL(product, this.user);
  }

  like(character) {
    character.isLiked = !character.isLiked;
    console.log(character.isLiked);
    // this.isLiked = !this.isLiked;

    if (character.isLiked) {
      this.addToWL(character);

    } else {
      this.deleteToWL(character);
    }
  }
  getRole(userId) {
    return this.db.object("/users/" + userId + "/role");
  }

  createRole(userId) {
    return this.db.object("/users/" + userId).update({ role: "user" })
  }
  



}
