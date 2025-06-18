import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductSeederService {
  constructor(private firestore: Firestore) {}

  async seedProducts(products: any[]) {
    const productsRef = collection(this.firestore, 'products');
    for (const product of products) {
      const { id, ...data } = product; // αγνοούμε το id
      await addDoc(productsRef, data);
    }
  }
}
