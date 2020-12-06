import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Personaje } from '../personaje';
import { templateJitUrl } from '@angular/compiler';
import firebase from "firebase/app";
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private http: HttpClient,
    private db: AngularFireDatabase) { }
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


    //   character.nLikes+=1;
    // this.db.list("/characters").push(character)


  }
  async existe2(character: Personaje, user: firebase.User) {
    let ref = firebase.database().ref("/users/" + user.uid + "/favoritos/" + "/characters/" + character.id);

    if (await this.isProductAddedtoWL(ref) == true) {
      // console.log('ENTRA');
      return true;
    }
    else {
      // console.log('NO ENTRA');
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
  async deleteAllWL(user: firebase.User) {
    this.db.object("/users/" + user.uid + "/favoritos/" + "/characters/").remove();
  }

  async deleteTWL(character: Personaje, user: firebase.User) {

    let item$ = this.db.list("/users/" + user.uid + "/favoritos/");


    // character.nLikes -= 1;
    // this.db.object("/characters/" + character.id).update(character);

    this.db.object("/users/" + user.uid + "/favoritos/" + "/characters/" + character.id).remove();



  }
  async isProductAddedtoWL(ref: firebase.database.Reference) {
    let flag;

    await ref.once("value").then(res => {
      flag = res.exists();

    })


    return flag;
  }

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



}
