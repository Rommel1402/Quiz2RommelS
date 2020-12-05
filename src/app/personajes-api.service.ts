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

  save(user: firebase.User) {
    this.db.object("/users/" + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  getWishListUser(user: firebase.User) {

    // let item$ = this.db.list("/users/" + user.uid + "/wish-list/");
    // return this.db.object("/users/"+user.uid+"/wish-list/products" );
    return this.db.list("/users/" + user.uid + "/favoritos/characters");

  }
  private createwL() {
    return this.db.list("/favoritos").push({
      dateCreated: new Date().getTime()
    })
  }

  private getwL(wLId: string) {
    return this.db.object("favoritos/" + wLId);
  }

  private async getOrCreateWLId() {
    let wLId = localStorage.getItem('wLId');
    if (wLId) return wLId;

    let res = await this.createwL();
    localStorage.setItem("wLId", res.key);
    return res.key;
  }




  // private async isProductAddedtoWL(ref: firebase.database.Reference) {
  //   let flag;
  //   await ref.once("value").then(res => {
  //     flag = res.exists();
  //   })
  //   return flag;
  // }

  async isProductAddedtoWL(ref: firebase.database.Reference) {
    let flag;

    await ref.once("value").then(res => {
      flag = res.exists();

    })


    return flag;
  }

  async deleteAllWL(user: firebase.User) {
    this.db.object("/users/" + user.uid + "/favoritos/" + "/characters/").remove();
  }

  async deleteTWL(character: Personaje, user: firebase.User) {

    let item$ = this.db.list("/users/" + user.uid + "/favoritos/");



    this.db.object("/users/" + user.uid + "/favoritos/" + "/characters/" + character.id).remove();



  }

  async existe2(character: Personaje, user: firebase.User) {
    let ref = firebase.database().ref("/users/" + user.uid + "/favoritos/" + "/characters/" + character.id);

    if (await this.isProductAddedtoWL(ref) == true) {
      console.log('ENTRA');
      return true;
    }
    else {
      console.log('NO ENTRA')
      return false;
    }

  }

  async existe(character: Personaje, user: firebase.User) {
    let ref = firebase.database().ref("users/" + user + "/favoritos/" + "/characters/");



    if (await this.isProductAddedtoWL(ref)) {
      return true;
    }
    else {
      return false;

    }
  }


  async searchCharacters(query = '', page = 1) {
    const filter = `${environment.baseUrlAPI}/?name=${query}&page=${page}`;
    // console.log('aquiii===>',filter)
    return await this.http.get<Personaje[]>(filter);

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
