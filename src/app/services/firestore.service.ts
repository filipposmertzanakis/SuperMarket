import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// filepath: c:\Users\Ryzen\supermarketApp\src\app\services\firestore.service.ts
import { map } from 'rxjs/operators';
interface Product {
  id: string;
  // Add other product properties here
}
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  constructor(private firestore: Firestore) {}

  getProducts(): Observable<any[]> {
    const productRef = collection(this.firestore, 'products');
    return collectionData(productRef, { idField: 'id' });
  }

getProductById(id: string): Observable<Product | undefined> {
  const productRef = collection(this.firestore, 'products');
  return collectionData(productRef, { idField: 'id' }).pipe(
    map((products: Product[]) => products.find(product => product.id === id))
  );
}

}