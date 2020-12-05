import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component';
import { PersonajesFavoritosComponent} from '../app/personajes-favoritos/personajes-favoritos.component';
import { DetallesPersonajeComponent } from './detalles-personaje/detalles-personaje.component';
const routes: Routes = [
  {
    path: 'characters-list', component: ListaPersonajesComponent 
  },
  {
    path: 'favoritos', component: PersonajesFavoritosComponent
  },
  { path: 'character-details/:id', component: DetallesPersonajeComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
