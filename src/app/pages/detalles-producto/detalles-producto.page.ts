import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.page.html',
  styleUrls: ['./detalles-producto.page.scss'],
  standalone: false,
})
export class DetallesProductoPage implements OnInit {
  compra: any;

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const purchaseId = params['id'];
      this.loadPurchaseDetails(purchaseId);
    });
  }

  loadPurchaseDetails(id: number) {
    const storedHistory = localStorage.getItem('purchaseHistory');
    if (storedHistory) {
      const purchaseHistory = JSON.parse(storedHistory);
      this.compra = purchaseHistory.find((p: any) => p.id === Number(id));
    }
  }

  getSubtotal(item: any) {
    return item.price * item.quantity;
  }
  volverAHistorial() {
    this.router.navigate(['/historial-compras']);
  }

}
