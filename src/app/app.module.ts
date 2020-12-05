import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import {NavbarComponent} from '../app/componentes/navbar/navbar.component';
import { PersonajesFavoritosComponent } from './personajes-favoritos/personajes-favoritos.component'

import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component'
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
// import {InfiniteScrollModule} from '../../node_modules/ng-infinite-scroll';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EditTaskComponent,
    NavbarComponent,
   PersonajesFavoritosComponent,
    ListaPersonajesComponent
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
