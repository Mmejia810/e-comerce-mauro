import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.scss'],
  standalone: false,
})
export class HistorialComprasComponent implements OnInit {
  compras: any[] = [];
  cargando: boolean = true;

  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {
    this.cargarHistorialCompras();
  }

  cargarHistorialCompras() {
    setTimeout(() => {
      const storedHistory = localStorage.getItem('purchaseHistory');
      this.compras = storedHistory ? JSON.parse(storedHistory) : [];
      this.cargando = false;
    }, 1000);
  }

  verDetalleCompra(compra: any) {
    this.router.navigate(['/historial-compras'], {
      queryParams: { id: compra.id, total: compra.total },
    });
    this.cerrar(); // Cierra el modal cuando redirige
  }

  vaciarHistorial() {
    localStorage.removeItem('purchaseHistory');
    this.compras = [];
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
