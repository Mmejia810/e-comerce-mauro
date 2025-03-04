import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.page.html',
  styleUrls: ['./historial-compras.page.scss'],
  standalone: false
})
export class HistorialComprasPage implements OnInit {
  compras: any[] = [];
  cargando: boolean = true;
  compraId: any;
  total: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.cargarHistorialCompras();
  }

  ionViewWillEnter() {
    this.cargarHistorialCompras(); // Recargar el historial cuando el usuario entre a la página
  }

  cargarHistorialCompras() {
    const storedHistory = localStorage.getItem('purchaseHistory');
    this.compras = storedHistory ? JSON.parse(storedHistory) : [];
    this.cargando = false;
  }

  guardarHistorial() {
    localStorage.setItem('purchaseHistory', JSON.stringify(this.compras));
  }

  verDetalleCompra(compra: any) {
    this.router.navigate(['/detalles-producto'], {
      queryParams: { id: compra.id, total: compra.total }
    });
  }

  async eliminarCompra(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar compra',
      message: '¿Estás seguro de que deseas eliminar esta compra?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.compras = this.compras.filter(compra => compra.id !== id);
            this.guardarHistorial();
          },
        },
      ],
    });
    await alert.present();
  }

  async vaciarHistorial() {
    if (this.compras.length === 0) {
      const alertaVacio = await this.alertCtrl.create({
        header: 'Historial vacío',
        message: 'No hay compras en el historial.',
        buttons: ['OK']
      });
      await alertaVacio.present();
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Vaciar historial',
      message: '¿Estás seguro de que deseas eliminar todo el historial de compras?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Vaciar',
          handler: () => {
            this.compras = [];
            localStorage.removeItem('purchaseHistory');
          },
        },
      ],
    });
    await alert.present();
  }

  irAHome() {
    this.router.navigate(['/home']);
  }
}
