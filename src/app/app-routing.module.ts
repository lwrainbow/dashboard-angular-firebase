import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

// custom RXJS pipe to return use to root page
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
// pipe use map operator to transform an optional user to a boolean or array, 
// if is a user redirect to profile page, otherwise to root page
const redirectLoggedInToProfile = () => map(user => user ? ['profile', (user as any).uid] : true);
// pipe will take a next route and use map operator to transform an optional user to a boolean or array, 
// if user id equal current user id return true. otherwise redirect to root page
const onlyAllowSelf = next => map(user => (!!user && next.params.id == (user as any).uid) || ['']);

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfile }
  }, {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: onlyAllowSelf } // pass a pipe through the route data's authGuardPipe
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
