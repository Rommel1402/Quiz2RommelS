import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import {NavbarComponent} from '../app/componentes/navbar/navbar.component';
import { PersonajesFavoritosComponent } from './personajes-favoritos/personajes-favoritos.component';

import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component'
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
// import {InfiniteScrollModule} from '../../node_modules/ng-infinite-scroll';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryContainerComponent } from './category-container/category-container.component';
import { DetallesPersonajeComponent } from './detalles-personaje/detalles-personaje.component';
import { CharacterCardComponent } from './componentes/character-card/character-card.component';
import { CardsListComponent } from './componentes/cards-list/cards-list.component';
import {AuthGuard} from './servicios/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    EditTaskComponent,
    NavbarComponent,
   PersonajesFavoritosComponent,
    ListaPersonajesComponent,
    CategoryContainerComponent,
    DetallesPersonajeComponent,
    CharacterCardComponent,
    CardsListComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    InfiniteScrollModule,
    BrowserAnimationsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
