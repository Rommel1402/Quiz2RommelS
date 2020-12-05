import { Injectable } from '@angular/core';

import {Task} from '../models/task';

import {AngularFirestoreCollection, AngularFirestore} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private taskCollection: AngularFirestoreCollection<Task>;
  constructor(private db:AngularFirestore) { 
    this.taskCollection=this.db.collection<Task>('tasks');
  }

  getAllTasks(){

    return this.taskCollection.snapshotChanges();

  }


}
