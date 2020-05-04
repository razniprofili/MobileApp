import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesApiSearchPageRoutingModule } from './movies-api-search-routing.module';

import { MoviesApiSearchPage } from './movies-api-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviesApiSearchPageRoutingModule
  ],
  declarations: [MoviesApiSearchPage]
})
export class MoviesApiSearchPageModule {}
