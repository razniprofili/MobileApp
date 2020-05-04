import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesApiSearchPage } from './movies-api-search.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesApiSearchPage
  },
  {
    path: ':imdbID',
    loadChildren: () => import('../movie-api-details/movie-api-details.module').then( m => m.MovieAPIDetailsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesApiSearchPageRoutingModule {}
