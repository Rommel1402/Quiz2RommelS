import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonajesAPIService } from '../servicios/personajes-api.service';
import { NavigationEnd, ParamMap } from '@angular/router';
import { Personaje } from '../personaje';
import { filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
import { AngularFireDatabase } from '@angular/fire/database';
import { HostListener } from '@angular/core';
import { FavoritosService } from '../servicios/favoritos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.scss']
})
export class ListaPersonajesComponent implements OnInit {
  ngOnInit(): void {
  }
  // showGoUpButton = false;
  // characters: Personaje[] = [];
  // info = {
  //   next: null,
  // };
  // private pageNum = 1;
  // private query: string;
  // private hideScrollHeight = 200;
  // private showScrollHeight = 500;
  // isLiked = false;
  // user;
  // // user$: Observable<firebase.User>;
  // user$ = this.afAuth.authState;

  // logged = false;
  // role;
  // available: boolean = false;
  // islogged: boolean;
 


  // constructor(private characterService: PersonajesAPIService,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private afAuth: AngularFireAuth,
  //   @Inject(DOCUMENT) private document: Document,
  //   private db: AngularFireDatabase,
  //   private fvS: FavoritosService,
  //   private http: HttpClient) {

   
  //   // this.onUrlChanged();

  //   this.user$.subscribe(async (user) => {
  //     if (user) {
  //       this.user = user;
  //       this.islogged = true;
      
  //       // await this.onUrlChanged();


  //       for (let index = 0; index < this.characters.length; index++) {
  //         // console.log('hola');
  //         const element = this.characters[index];
  //         // console.log(element);
  //         if ( await fvS.existe2(this.characters[index], user) == true) {
  //           this.characters[index].isLiked = true;
  //           // this.isLiked = true;
  //         } else {
  //           this.characters[index].isLiked = false;
  //           // this.isLiked = false;
  //         }

  //       }


  //     } else {
  //       this.islogged = false;
  //     }
  //   })
  // }

  

  // async ngOnInit() {
    
  //   // this.getDataFromService();
  //   // this.getCharactersByQuery();

  //   this.user$.subscribe(user => {
  //     this.user = user;
  //     if (user) {
  //       this.logged = true;
  //       this.getRole(user.uid).valueChanges().subscribe(role => {
  //         if (!role) {
  //           this.createRole(user.uid);
  //           return this.role = "user";
  //         }
  //         this.role = role;
  //       })
        
  //     }
  //   })
  // }

  // private async onUrlChanged(): Promise<void> {
  //   await this.router.events.pipe(
  //     filter((event) => event instanceof NavigationEnd)).subscribe(
  //       async () => {
  //         this.characters = [];
  //         this.pageNum = 1;
  //         await this.getCharactersByQuery();
  //       }
  //     )

  // }

  // @HostListener('window:scroll', [])

  // onWindowScroll(): void {
  //   const yOffSet = window.pageYOffset;

  //   if ((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {

  //     this.showGoUpButton = true;

  //   } else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {

  //     this.showGoUpButton = false;

  //   }

    
  // }



  // onScrollDown(): void {
  //   if (this.info.next) {
  //     this.pageNum++;
  //     this.getDataFromService();
  //   }
  // }

  // onScrollTop(): void {
  //   this.document.body.scrollTop = 0;
  //   this.document.documentElement.scrollTop = 0;
  // }

  // private async getCharactersByQuery(): Promise<void> {
  //   await this.route.queryParams.pipe(
  //     take(1)).subscribe(async (params: ParamMap) => {
  //       console.log('Params', params);
  //       this.query = params['q'];
  //       await this.getDataFromService();
  //     });

  // }

  // private async getDataFromService(): Promise<void> {

  //   await (await this.characterService.searchCharacters(this.query, this.pageNum)).pipe(take(1))
  //     .subscribe((res: any) => {
  //       if (res?.results?.length) {
  //         console.log('Response==>', res);
  //         const { info, results } = res;
  //         this.characters = [... this.characters, ...results]
  //         this.info = info;

  //       } else {
  //         this.characters = [];
  //       }
  //     });
      

  // }

  // addToWL(product) {
  //   this.fvS.addToWL(product, this.user);
  // }

  // deleteToWL(product) {
  //   this.fvS.deleteTWL(product, this.user);
  // }

  // like(character) {
  //   character.isLiked = !character.isLiked;
  //   console.log(character.isLiked);
  //   // this.isLiked = !this.isLiked;

  //   if (character.isLiked) {
  //     this.addToWL(character);
  //     this.characterService.create(character);

  //   } else {
  //     this.deleteToWL(character);
  //   }
  // }
  // getRole(userId) {
  //   return this.db.object("/users/" + userId + "/role");
  // }

  // createRole(userId) {
  //   return this.db.object("/users/" + userId).update({ role: "user" })
  // }
  

  // async filterby(option:string){
  //   console.log(option);
  //   const filter = `https://rickandmortyapi.com/api/character/?name=rick&status=alive`;

  //   // const filter = `https://rickandmortyapi.com/api/character/?status=alive`;
  //   // console.log('aquiii===>',filter)
  //   return await this.http.get<Personaje[]>(filter).pipe(take(1))
  //     .subscribe((res: any) => {
  //       if (res?.results?.length) {
  //         console.log('Respuesta==>', res);
  //         const { info, results } = res;
  //         this.characters = [... this.characters, ...results]
  //         this.info = info;

  //       } else {
  //         this.characters = [];
  //       }
  //     });
    
  //   // console.log(option)
  //   // if (option == 'Female' || option === 'Male' || option === 'Genderless' || option ==='unknown'){
  //   //   this.characters = this.characters.filter(p => p.gender === option);
  //   // } else if (option === 'Alive' || option === 'Dead' || option==='unknown'){
  //   //   this.characters = this.characters.filter(p => p.status === option);
  //   // }else{
  //   //   this.characters = this.characters.filter(p => p.species === option);
  //   // }
  //   // for (let index = 0; index < this.characters.length; index++) {
  //   //   // console.log('hola');
  //   //   const element = this.characters[index];
  //   //   // console.log(element);
  //   //   if (await this.fvS.existe2(this.characters[index], this.user) == true) {
  //   //     this.characters[index].isLiked = true;
  //   //     // this.isLiked = true;
  //   //   } else {
  //   //     this.characters[index].isLiked = false;
  //   //     // this.isLiked = false;
  //   //   }

  //   // }
     
    

  // }

}
