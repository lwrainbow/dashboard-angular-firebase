import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Booleen var if the page still loading
  loading = false;
  // action hold the types of string login or string signup, default is string login
  action: 'login' | 'signup' = 'login';
  // error meaage
  error: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    this.loading = true;
    this.error = null;

    const { firstName, lastName, email, password } = form.value;

    let resp;
    try {
      // if it is SignUp page then create user, if is Login page then login
      if (this.isSignUp) {
        resp = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
        await resp.user.updateProfile({ displayName: `${firstName} ${lastName}`});
      } else {
        resp = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      }

      // get id from response
      const uid = resp.user.uid;

      // use router to navigate profile page
      this.router.navigate([`/profile/${uid}`]);
      
      // clear the form content
      form.reset();
    } catch(error) {
      console.log(error.message);
      this.error = error.message;
    }
    this.loading = false;
  }

  get isLogin() {
    return this.action === 'login';
  }

  get isSignUp() {
    return this.action === 'signup';
  }
}
