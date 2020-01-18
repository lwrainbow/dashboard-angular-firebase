import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  isLoggedIn() {
    return !!this.afAuth.auth.currentUser;
  }
}
