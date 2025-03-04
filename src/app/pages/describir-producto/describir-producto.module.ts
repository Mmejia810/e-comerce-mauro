import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescribirProductoPageRoutingModule } from './describir-producto-routing.module';

import { DescribirProductoPage } from './describir-producto.page';
import { CartModule } from "../../components/cart/cart.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescribirProductoPageRoutingModule,
    CartModule // ✅ Asegúrate de que el path sea correcto
  ],
  declarations: [DescribirProductoPage] // ❌ Eliminé la coma extra
})
export class DescribirProductoPageModule {}
