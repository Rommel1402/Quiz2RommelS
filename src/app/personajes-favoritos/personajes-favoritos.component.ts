import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Personaje } from '../personaje';
import { PersonajesAPIService } from '../servicios/personajes-api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import firebase from "firebase/app";
import { FavoritosService } from '../servicios/favoritos.service';
@Component({
  selector: 'app-personajes-favoritos',
  templateUrl: './personajes-favoritos.component.html',
  styleUrls: ['./personajes-favoritos.component.scss']
})
export class PersonajesFavoritosComponent implements OnInit {

  showGoUpButton = false;
  all_products = [];
  user;
  characters: Personaje[] = [];
  booleano2: boolean;
  quantity;
  bagService: any;
  wLService: any;
  isLiked: boolean;
  info = {
    next: null,
  };
  user$ = this.afAuth.authState;
  private pageNum = 1;
  private query: string;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;


  
  constructor(
    private route: ActivatedRoute,
    private CharacterService: PersonajesAPIService,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: RouterModule,
    private fvS:FavoritosService,

    @Inject(DOCUMENT) private document: Document) {
    this.user$.subscribe(user => {
      this.user = user;
      let ref = firebase.database().ref("/users/" + user.uid + "/favoritos/");
      ref.once("value").then(res => {
        this.booleano2 = res.exists();
        // console.log(this.booleano2);

        this.fvS.getWishListUser(user).valueChanges().pipe(
          map(changes => changes.map(c => c))
        ).subscribe(c => {
          this.all_products = c
          console.log(c);
        });

        // this.wishListService.getWishListUser(user).valueChanges().pipe(
        //   map(changes => changes.map(c => c))
        // ).subscribe(c => {
        //   c.map(k => this.all_products.push(k))
        // });

        // console.log(this.all_products);
        // console.log(this.all_products);

      })
    })

    this.user$.subscribe(async user => {
      if (user) {
        this.user = user;


      }

    });
  }

  delete_product(character: Personaje) {
    this.fvS.deleteTWL(character, this.user);

    this.fvS.getWishListUser(this.user).valueChanges().pipe(
      map(changes => changes.map(c => c))
    ).subscribe(c => {
      this.all_products = c
      if (this.all_products.length == 0) {
        window.location.reload();
      }
    });

    // window.location.reload();
  }

  deleteAllProducts() {
    this.fvS.deleteAllWL(this.user);
    window.location.reload();
  }

  ngOnInit(): void {
  }




  addToWL(character) {
    this.fvS.addToWL(character, this.user);
  }

  deleteToWL(character) {
    this.fvS.deleteTWL(character, this.user);
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

  private async getDataFromService(): Promise<void> {

    (await this.CharacterService.searchCharacters(this.query, this.pageNum)).pipe(take(1))
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

  @HostListener('window:scroll', [])

  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;

    if ((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {

      this.showGoUpButton = true;

    } else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {

      this.showGoUpButton = false;

    }

  }
}
