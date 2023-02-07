import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { Libro } from '../entidades/Libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  
  user = JSON.parse(localStorage.getItem('user'));
  private dbPath = '/Bibliotecario/' + this.user.uid + '/Libros';
  librosRef: AngularFirestoreCollection<Libro>;
  collections: AngularFirestoreCollection<Libro>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage) {    
    this.librosRef = db.collection(this.dbPath); 
    console.log(this.user.uid)
  }

  getAll(): AngularFirestoreCollection<Libro> {
    return this.librosRef;
  }

  getCollectionLibros(path: string): AngularFirestoreCollection<Libro> {
    this.collections = this.db.collection(path);
    return this.collections;
  }

  getById(id: string): Observable<any> {
    return this.librosRef.doc(id).valueChanges();
  }

  getByIdLibro(id: string, path: string): Observable<any>{
    this.collections = this.db.collection(path)
    return this.collections.doc(id).valueChanges();
  }

  create(libro: Libro): any {
    return this.librosRef.add(libro);
  }

  update(id: string, libro: Libro): Promise<void> {
    return this.librosRef.doc(id).update(libro);
  }

  updateStock(id: string, libro: Libro, path: string): Promise<void> {
    this.collections = this.db.collection(path)
    return this.collections.doc(id).update(libro)
  }

  delete(id: string): Promise<void> {
    return this.librosRef.doc(id).delete();
  }

  deleteDoc(id: string) {
    const collection = this.db.collection(this.dbPath);
    return collection.doc(id).delete();
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