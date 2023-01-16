import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TamamlananlarPageRoutingModule } from './tamamlananlar-routing.module';

import { TamamlananlarPage } from './tamamlananlar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TamamlananlarPageRoutingModule
  ],
  declarations: [TamamlananlarPage]
})
export class TamamlananlarPageModule {}
