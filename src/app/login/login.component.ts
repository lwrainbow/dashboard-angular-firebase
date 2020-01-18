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
  loading = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    this.loading = true;

    const { firstName, lastName, email, password } = form.value;

    try {
      const resp = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      await resp.user.updateProfile({ displayName: `${firstName} ${lastName}`});

      // get id from response
      const uid = resp.user.uid;

      // use router to navigate profile page
      this.router.navigate([`/profile/${uid}`]);
      
      // clear the form content
      form.reset();
    } catch(error) {
      console.log(error.message);
    }
    this.loading = false;
  }
}
