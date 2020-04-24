import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyprofilePageRoutingModule } from './myprofile-routing.module';

import { MyprofilePage } from './myprofile.page';
import {MenufullComponent} from "../komponente/menufull/menufull.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyprofilePageRoutingModule
  ],
  declarations: [MyprofilePage, MenufullComponent]
})
export class MyprofilePageModule {}
