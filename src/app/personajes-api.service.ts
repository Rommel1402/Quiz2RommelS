import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Personaje } from './personaje';
import { templateJitUrl } from '@angular/compiler';
import firebase from "firebase/app";
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class PersonajesAPIService {

  constructor(private http: HttpClient,
    private db: AngularFireDatabase) { }


  searchCharacters(query = '', page = 1) {
    const filter = `${environment.baseUrlAPI}/?name=${query}&page=${page}`;
    // console.log('aquiii===>',filter)
    return this.http.get<Personaje[]>(filter);

  }

  getDetails(id: number) {

    return this.http.get<Personaje>(`${environment.baseUrlAPI}/${id}`);

  }

  async addToWL(character: Personaje, user: firebase.User) {

    let item$ = this.db.list("/users/" + user.uid + "/wish-list/");

    let wLKey = item$.push({
      //  POR AHORA BORRAR
    }).key
    console.log(character.key);
    this.db.object("/users/" + user.uid + "/favoritos/" + "/characters/" + character.id)
      .set({
        character
      })



  }


  create(character) {
    return this.db.list("/characters").push(character);
  }

  getAll() {
    return this.db.list("/characters");
  }

  getProduct(characterId) {
    return this.db.object("/characters/" + characterId);
  }

  update(characterId, character) {
    return this.db.object("/characters/" + characterId).update(character);
  }

  delete(characterId) {
    return this.db.object("/characters/" + characterId).remove();
  }

}
