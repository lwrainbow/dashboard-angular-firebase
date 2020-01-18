import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dashboard-angular-firebase';

  constructor(private auth: AuthService) { }

  ngOnInit() {
    particlesJS.load('particles', 'assets/data/particles.json', () => {
      console.log('callback - particles.js config loaded');
    });
  }

  logout() {
    this.auth.logout();
  }
}
