import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'movies-api-search',
    loadChildren: () => import('./movies-api-search/movies-api-search.module').then( m => m.MoviesApiSearchPageModule)
  },
  {
    path: ':imdbID',
    loadChildren: () => import('./movie-api-details/movie-api-details.module').then( m => m.MovieAPIDetailsPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
