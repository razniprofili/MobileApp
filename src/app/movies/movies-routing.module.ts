import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesPage } from './movies.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MoviesPage,
    children:[  //moraju da se gadjaju rute sa tabovima, pazi
      {
        path: 'add-movie',
        loadChildren: () => import('./add-movie/add-movie.module').then( m => m.AddMoviePageModule)
      },
      {
        path: 'search-movie',
        loadChildren: () => import('./search-movie/search-movie.module').then( m => m.SearchMoviePageModule)
      },
      {
        path: 'home-page',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'activity',
        loadChildren: () => import('./activity/activity.module').then( m => m.ActivityPageModule)
      },
      {
        path: '',  //ako se stavi /tabs pa nista dalje ovo je stranica na koju se prosledjuje
        redirectTo:'/movies/tabs/home-page',
        pathMatch: 'full'
      }
    ]

  },
  {
    path: '', //ako je bez icea napisano opet ovde prosledjuje
    redirectTo:'/movies/tabs/home-page',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then( m => m.ActivityPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
