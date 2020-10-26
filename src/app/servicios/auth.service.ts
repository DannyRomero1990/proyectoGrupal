import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { promise } from 'protractor';
import { Router } from '@angular/router';
import {AngularFirestore} from "@angular/fire/firestore"



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private AFauth: AngularFireAuth, 
    private router: Router,
    private db: AngularFirestore) { }

  

  //creamos nuestro método de autenticación de inicio de sesión
  login(email:string, password:string){
    //nos devuelve una promesa
    return new Promise((resolve, rejected)=>{
      this.AFauth.signInWithEmailAndPassword(email, password).then(user=>{
        resolve(user)
      }).catch(err => rejected(err));
    });
  }

  Onlogut(){
    this.AFauth.signOut().then(()=>{
      this.router.navigate(['/login']);
    });
  }

  register(email: string, password: string, name: string){
    return new Promise((resolve, reject)=>{
      this.AFauth.createUserWithEmailAndPassword(email, password).then(res=>{
        //console.log(res.user.uid);
        const uid=res.user.uid;
        this.db.collection('users').doc(uid).set({
          name: name,
          uid: uid,
        })
        resolve(res)
      }).catch(err=>reject(err))
    })
    
  }
}