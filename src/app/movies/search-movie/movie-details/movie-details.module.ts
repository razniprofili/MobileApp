import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailsPageRoutingModule } from './movie-details-routing.module';

import { MovieDetailsPage } from './movie-details.page';
import {MovieModalComponent} from "../../movie-modal/movie-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailsPageRoutingModule

  ],
  declarations: [MovieDetailsPage, MovieModalComponent],
  entryComponents: [MovieModalComponent]
})
export class MovieDetailsPageModule {}
