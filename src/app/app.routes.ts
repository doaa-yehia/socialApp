import { loggedGuard } from './core/gaurds/logged/logged.guard';
import { authGuard } from './core/gaurds/auth/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"",redirectTo:'/home',pathMatch:'full'},
    {path:"register",loadComponent: ()=> import('./pages/register/register.component').then ( c => c.RegisterComponent), title:'register',canActivate:[loggedGuard]},
    {path:"logIn",loadComponent: ()=> import('./pages/log-in/log-in.component').then ( c => c.LogInComponent), title:'register',canActivate:[loggedGuard]},
    {path:"changePassword",loadComponent: ()=> import('./pages/change-password/change-password.component').then ( c => c.ChangePasswordComponent), title:'change Password',canActivate:[loggedGuard]},
    {path:"home",loadComponent: ()=> import('./pages/time-line/time-line.component').then ( c => c.TimeLineComponent), title:'home',canActivate:[authGuard]},

];
