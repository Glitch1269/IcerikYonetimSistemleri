import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TamamlananlarPage } from './tamamlananlar.page';

const routes: Routes = [
  {
    path: '',
    component: TamamlananlarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TamamlananlarPageRoutingModule {}
