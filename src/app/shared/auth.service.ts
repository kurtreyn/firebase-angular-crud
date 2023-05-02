import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true')
      this.router.navigate(['/dashboard'])
    }, err => {
      alert('Something went wring' + err.message)
      this.router.navigate(['/login'])
    })
  }

  // register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registration successful')
      this.router.navigate(['/login'])
    }, err => {
      alert('Something went wring')
      this.router.navigate(['/register'])
    })
  }

  // signout method
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    }, err => {
      alert('Something went wring' + err.message)
    })

  }
}
