import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GorevPageRoutingModule } from './gorev-routing.module';

import { GorevPage } from './gorev.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GorevPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [GorevPage]
})
export class GorevPageModule {}
