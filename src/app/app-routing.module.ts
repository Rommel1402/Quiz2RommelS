import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component';

const routes: Routes = [
  {
    path: 'character-list' , component : ListaPersonajesComponent 
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
