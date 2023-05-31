import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './user/user.component';
import { authGuard } from './auth/auth.guard';
import { PlaceComponent } from './place/place.component';
import { appGuard } from './app.guard';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
    {path: '',redirectTo: 'login',pathMatch:'full'},
    {
      path: 'login', 
      canActivate: [appGuard],
      component: LoginComponent
    },
    {
      path: 'places',
      component: PlaceComponent,
      canActivate: [authGuard],
      data: {
        role: 'ROLE_ADMIN'
      }
    },
    {
      path: 'users', 
      component: UserComponent, 
      canActivate: [authGuard],
      data: {
        role: 'ROLE_ADMIN'
      }
    },    
    {
      path: 'recover',
      component: RecoverPasswordComponent,
    },
    {
      path: 'verify',
      component: VerifyComponent,
    },
    {
      path: '**' , 
      redirectTo:''
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingRoutingModule { }
