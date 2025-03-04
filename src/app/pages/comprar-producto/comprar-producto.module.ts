import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComprarProductoPageRoutingModule } from './comprar-producto-routing.module';
import { ComprarProductoPage } from './comprar-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComprarProductoPageRoutingModule
  ],
  declarations: [ComprarProductoPage]
})
export class ComprarProductoPageModule {}
