import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { BuscadorComponent } from 'src/app/components/buscador/buscador.component';
import { FiltroCategoriasComponent } from 'src/app/components/filtro-categorias/filtro-categorias.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, BuscadorComponent, FiltroCategoriasComponent]
})
export class HomePageModule {}
