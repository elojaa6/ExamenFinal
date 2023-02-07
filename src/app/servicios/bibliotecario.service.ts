import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FieldPath } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Bibliotecario } from '../entidades/Bibliotecario';

@Injectable({
  providedIn: 'root'
})
export class BibliotecarioService {

  private dbPath = '/Bibliotecario';
  bibliotecarioRef: AngularFirestoreCollection<Bibliotecario>;

  constructor(
    private firestore: AngularFirestore
  ) { 
    this.bibliotecarioRef = firestore.collection(this.dbPath)
  }

  getId() {
    return this.firestore.createId()
  }

  createDoc(data : any, path: string, id: string) {
    const collection = this.firestore.collection('Bibliotecario')
    return collection.doc(id).set(data)
  }

  getAll(): AngularFirestoreCollection<Bibliotecario> {
    return this.bibliotecarioRef;
  }

  getCollectionBibliotecario<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }


  getDoc<tipo>(path: string, id: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
  }

}
