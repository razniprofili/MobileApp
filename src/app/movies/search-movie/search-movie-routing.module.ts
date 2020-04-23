import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMoviePage } from './search-movie.page';


const routes: Routes = [
  {
    path: '',
    component: SearchMoviePage
  }
  ,
  {
    path: ':movieId',
    loadChildren: () => import('./movie-details/movie-details.module').then( m => m.MovieDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchMoviePageRoutingModule {}
