import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityPageRoutingModule } from './activity-routing.module';

import { ActivityPage } from './activity.page';
import {SearchMoviePageModule} from '../search-movie/search-movie.module';

import { ChartsModule } from 'ng2-charts';
import {NgxPopperModule} from 'ngx-popper';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ActivityPageRoutingModule,
        SearchMoviePageModule,
        ChartsModule,
    NgxPopperModule
    ],
    declarations: [ActivityPage]
})
export class ActivityPageModule {}
