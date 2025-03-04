import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescribirProductoPage } from './describir-producto.page';

const routes: Routes = [
  {
    path: '',
    component: DescribirProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescribirProductoPageRoutingModule {}
