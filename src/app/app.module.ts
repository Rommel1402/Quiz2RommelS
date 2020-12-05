import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import {NavbarComponent} from '../app/componentes/navbar/navbar.component';
import { PersonajesFavoritosComponent } from './personajes-favoritos/personajes-favoritos.component'
@NgModule({
  declarations: [
    AppComponent,
    EditTaskComponent,
    NavbarComponent,
    PersonajesFavoritosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
