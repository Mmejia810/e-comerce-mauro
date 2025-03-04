import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EComerceMauroService } from 'src/app/services/e-comerce-mauro.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-describir-producto',
  templateUrl: './describir-producto.page.html',
  styleUrls: ['./describir-producto.page.scss'],
  standalone: false,
})
export class DescribirProductoPage implements OnInit {
  producto: any;
  estrellas: number[] = [];
  reviews: any[] = [];
  cartItemCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eComerceService: EComerceMauroService,
    private cartService: CartService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eComerceService.getProductById(id).subscribe((data) => {
        this.producto = data;

        this.estrellas = Array(5)
          .fill(0)
          .map((_, i) => (i < Math.round(data.rating.rate) ? 1 : 0));

        if (data.reviews) {
          this.reviews = data.reviews;
        }
      });
    }

    // Suscribirse a los cambios en el carrito
    this.cartService.getCartItemCountObservable().subscribe((count) => {
      this.cartItemCount = count;
    });
  }

  addToCart() {
    if (!this.producto) {
      console.error('Error: No hay producto cargado');
      return;
    }
    this.cartService.addToCart(this.producto);
    this.showToast(`✅ ${this.producto.title} añadido al carrito`);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  buyNow(product: any, event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(product);
    this.showToast(`⚡ ${product.title} añadido al carrito`);
    this.router.navigate(['/cart']);
  }

  goToCartPage() {
    this.router.navigate(['/cart']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
