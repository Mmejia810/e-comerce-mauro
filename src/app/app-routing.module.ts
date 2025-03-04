import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'describir-producto/:id', // para que redirija dependiendo el id del producto
    loadChildren: () => import('./pages/describir-producto/describir-producto.module').then(m => m.DescribirProductoPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'comprar-producto',
    loadChildren: () => import('./pages/comprar-producto/comprar-producto.module').then(m => m.ComprarProductoPageModule)
  },
  {
    path: 'historial-compras',
    loadChildren: () => import('./pages/historial-compras/historial-compras.module').then(m => m.HistorialComprasPageModule)
  },
  {
    path: 'detalles-producto',
    loadChildren: () => import('./pages/detalles-producto/detalles-producto.module').then( m => m.DetallesProductoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
