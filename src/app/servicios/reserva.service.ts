import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { Reserva } from '../entidades/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  user = JSON.parse(localStorage.getItem('user'));
  //idDoc = localStorage.getItem("user")
  private dbPath = '/users/'+this.user.uid+'/Reserva';
  reservaRef: AngularFirestoreCollection<Reserva>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage) {    
    this.reservaRef = db.collection(this.dbPath); 
  }

  getAll(): AngularFirestoreCollection<Reserva> {
    return this.reservaRef;
  }

  getCollectionReservas<tipo>(path: string) {
    const collection = this.db.collection<tipo>(path);
    return collection.valueChanges();
  }

  getById(id: string): Observable<any> {
    return this.reservaRef.doc(id).valueChanges();
  }

  create(reserva: Reserva): any {
    return this.reservaRef.add(reserva);
  }

  update(id: string, reserva: Reserva): Promise<void> {
    return this.reservaRef.doc(id).update(reserva);
  }

  delete(id: string): Promise<void> {
    return this.reservaRef.doc(id).delete();
  }

  uploadImage(file: any, path: string, nombre: string): Promise<string> {
    return new Promise(resolve => {
      const filePath = path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const downloadURL = res;
            resolve(downloadURL);
            return;
          });
        })
      )
        .subscribe();
    });
  }
}