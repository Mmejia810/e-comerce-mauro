import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprarProductoPage } from './comprar-producto.page';

const routes: Routes = [
  {
    path: '',
    component: ComprarProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprarProductoPageRoutingModule {}
