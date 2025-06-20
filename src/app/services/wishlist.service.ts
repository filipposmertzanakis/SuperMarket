import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private firestore: Firestore) {}

  private getWishlistDocRef(userId: string) {
    return doc(this.firestore, `wishlists/${userId}`);
  }

  async addToWishlist(userId: string, productId: string) {
    const wishlistRef = this.getWishlistDocRef(userId);
    const docSnap = await getDoc(wishlistRef);

    if (docSnap.exists()) {
      await updateDoc(wishlistRef, {
        products: arrayUnion(productId)
      });
    } else {
      await setDoc(wishlistRef, {
        userId,
        products: [productId]
      });
    }
  }

  async removeFromWishlist(userId: string, productId: string) {
    const wishlistRef = this.getWishlistDocRef(userId);
    await updateDoc(wishlistRef, {
      products: arrayRemove(productId)
    });
  }

  async getWishlist(userId: string): Promise<string[]> {
    const wishlistRef = this.getWishlistDocRef(userId);
    const docSnap = await getDoc(wishlistRef);
    if (docSnap.exists()) {
      return docSnap.data()['products'] || [];
    }
    return [];
  }
}
