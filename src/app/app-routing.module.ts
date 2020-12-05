import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component';
import { PersonajesFavoritosComponent} from '../app/personajes-favoritos/personajes-favoritos.component';
const routes: Routes = [
  {
    path: 'characters-list', component: ListaPersonajesComponent 
  },
  {
    path: 'favoritos', component: PersonajesFavoritosComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
