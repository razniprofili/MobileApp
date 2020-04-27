import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMoviePageRoutingModule } from './add-movie-routing.module';

import { AddMoviePage } from './add-movie.page';
import {ComponentsModule} from "../../komponente/components/components.module";
import {SearchMoviePageModule} from "../search-movie/search-movie.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddMoviePageRoutingModule,
        ComponentsModule,
        SearchMoviePageModule
    ],
  declarations: [AddMoviePage]
})
export class AddMoviePageModule {}
