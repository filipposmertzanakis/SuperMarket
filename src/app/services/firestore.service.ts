import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  getProducts(): Observable<any[]> {
    const productRef = collection(this.firestore, 'products');
    return collectionData(productRef, { idField: 'id' });
  }
}