import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component';
import { PersonajesFavoritosComponent} from '../app/personajes-favoritos/personajes-favoritos.component';
import { DetallesPersonajeComponent } from './detalles-personaje/detalles-personaje.component';

import {AuthGuard} from '../app/servicios/guards/auth.guard';
import { CardsListComponent } from './componentes/cards-list/cards-list.component';

const routes: Routes = [
  {
    path: '', component: ListaPersonajesComponent 
  },
  {
    path: 'characters-list', component: ListaPersonajesComponent
  },
  {
    path: ':pageNum', component: ListaPersonajesComponent
  },

  {
    path: 'favorite-list', component: PersonajesFavoritosComponent, canActivate:[AuthGuard]
  },
  { path: 'character-details/:id', component: DetallesPersonajeComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
