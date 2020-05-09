import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieAPIDetailsPageRoutingModule } from './movie-api-details-routing.module';

import { MovieAPIDetailsPage } from './movie-api-details.page';
//import {MovieModalComponent} from "../../movie-modal/movie-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieAPIDetailsPageRoutingModule
  ],
  declarations: [MovieAPIDetailsPage]

})
export class MovieAPIDetailsPageModule {}
