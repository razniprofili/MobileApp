import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesPage } from './movies.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesPage
  },
  {
    path: 'add-movie',
    loadChildren: () => import('./add-movie/add-movie.module').then( m => m.AddMoviePageModule)
  },
  {
    path: 'search-movie',
    loadChildren: () => import('./search-movie/search-movie.module').then( m => m.SearchMoviePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
