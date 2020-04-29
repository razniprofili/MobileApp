import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieAPIDetailsPage } from './movie-api-details.page';

const routes: Routes = [
  {
    path: '',
    component: MovieAPIDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieAPIDetailsPageRoutingModule {}
