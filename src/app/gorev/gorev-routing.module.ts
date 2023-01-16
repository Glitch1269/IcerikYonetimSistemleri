import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GorevPage } from './gorev.page';

const routes: Routes = [
  {
    path: '',
    component: GorevPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GorevPageRoutingModule {}
