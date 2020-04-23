import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchMoviePageRoutingModule } from './search-movie-routing.module';

import { SearchMoviePage } from './search-movie.page';
import {MovieElementComponent} from "../movie-element/movie-element.component";
import {MenuComponent} from "../../komponente/menu/menu.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchMoviePageRoutingModule
  ],
  declarations: [SearchMoviePage, MovieElementComponent, MenuComponent]
})
export class SearchMoviePageModule {}
