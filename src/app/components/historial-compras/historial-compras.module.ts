import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HistorialComprasComponent } from './historial-compras.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [HistorialComprasComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [HistorialComprasComponent], // ✅ Se exporta para ser usado en otros módulos
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ Permite el uso de componentes personalizados
})
export class HistorialComprasModule { }
