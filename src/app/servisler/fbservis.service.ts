import { Gorev } from '../models/Gorev';
import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { addDoc, updateDoc } from '@firebase/firestore';
import { Auth, authState, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Uye } from '../models/Uye';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  aktifUye = authState(this.auth);
  constructor(
    public fs: Firestore,
    public auth: Auth,
    // public storage: Storage
  ) { }

 

  KayitOl(mail: string, parola: string) {
    return from(createUserWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumAc(mail: string, parola: string) {
    return from(signInWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumKapat() {
    return from(this.auth.signOut());
  }

  get AktifUyeBilgi() {
    return this.aktifUye.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.fs, 'Uyeler', user?.uid);
        return docData(ref) as Observable<Uye>;
      })
    );
  }

  GorevListele() {
    var ref = collection(this.fs, "Gorevler");
    return collectionData(ref, { idField: 'gorevId' }) as Observable<Gorev[]>;
  }
  GorevEkle(gorev: Gorev) {
    var ref = collection(this.fs, "Gorevler");
    return addDoc(ref, gorev);
  }
  GorevDuzenle(gorev: Gorev) {
    var ref = doc(this.fs, "Gorevler/" + gorev.gorevId);
    return updateDoc(ref, { ...gorev });
  }
  GorevSil(gorev: Gorev) {
    var ref = doc(this.fs, "Gorevler/" + gorev.gorevId);
    return deleteDoc(ref);
  }

  UyeListele() {
    var ref = collection(this.fs, "Uyeler");
    return collectionData(ref, { idField: 'uid' }) as Observable<Uye[]>;
  }
  UyeEkle(uye: Uye) {
    var ref = doc(this.fs, 'Uyeler', uye.uid);
    return from(setDoc(ref, uye));
  }
  UyeDuzenle(uye: Uye) {
    var ref = doc(this.fs, "Uyeler", uye.uid);
    return from(updateDoc(ref, { ...uye }));
  }
  UyeSil(uye: Uye) {
    var ref = doc(this.fs, "Uyeler", uye.uid);
    return deleteDoc(ref);
  }
}
