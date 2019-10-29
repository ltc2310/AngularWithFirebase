import { Injectable } from '@angular/core';
import { Boardgame } from './boardgame.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BoardgameService {

  formData: Boardgame;

  constructor(private firestore: AngularFirestore) { }

  getBoardgames() {
    return this.firestore.collection('boardgames').snapshotChanges();
  }
}
