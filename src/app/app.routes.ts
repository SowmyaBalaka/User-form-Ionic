import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
  ,
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'explore',
    loadComponent: () => import('./pages/explore/explore.page').then(m => m.ExplorePage)
  }, {
    path: 'calender',
    loadComponent: () => import('./pages/calender/calender.page').then(m => m.CalenderPage)
  }, {
    path: 'form',
    loadComponent: () => import('./pages/register-form/register-form.component').then(m => m.RegisterFormComponent)
  }, {
    path: 'form/:id',
    loadComponent: () => import('./pages/register-form/register-form.component').then(m => m.RegisterFormComponent)

  },


];
