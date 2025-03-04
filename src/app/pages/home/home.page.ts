import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EComerceMauroService } from 'src/app/services/e-comerce-mauro.service';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { HistorialComprasComponent } from 'src/app/components/historial-compras/historial-compras.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  productos: any[] = []; // Productos totales
  filteredProducts: any[] = []; // Productos mostrados
  categorias: string[] = [];
  selectedCategory: string = 'todo';
  page: number = 1;
  limit: number = 10;
  allLoaded: boolean = false;
  cartItemCount: number = 0;
  private cartSubscription: Subscription | null = null;

  constructor(
    private eComerceService: EComerceMauroService,
    private cartService: CartService,
    private router: Router,
    private toastController: ToastController,
    private modalCtrl: ModalController
  ) {}

  async verHistorial() {
    const modal = await this.modalCtrl.create({
      component: HistorialComprasComponent
    });
    await modal.present();
  }

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();

    // 📌 Se suscribe a los cambios en el carrito
    this.cartSubscription = this.cartService.getCartItemCountObservable()
      .subscribe(count => {
        this.cartItemCount = count;
      });
  }

  ionViewWillEnter() {
    this.updateCartCount();
    // Vuelve a cargar los productos y categorías cada vez que se regresa a la página
    this.loadCategories();
    this.loadProducts();
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
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

  goToCartPage() {
    this.router.navigate(['/cart']);
  }

  loadCategories() {
    this.eComerceService.getCategories().subscribe({
      next: (data: string[]) => {
        if (Array.isArray(data)) {
          this.categorias = ['todo', ...data];
        } else {
          console.error('Error: Categorías no son un array válido.', data);
        }
      },
      error: (err) => console.error('Error al cargar categorías:', err),
    });
  }

  loadProducts() {
    this.eComerceService.getProducts().subscribe({
      next: (data: any[]) => {
        if (Array.isArray(data)) {
          this.productos = data;
          this.filteredProducts = this.productos.slice(0, this.limit);
        } else {
          console.error('Error: Productos no son un array válido.', data);
        }
      },
      error: (err) => console.error('Error al cargar productos:', err),
    });
  }

  filterProducts(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.filterByCategory(this.selectedCategory);
      return;
    }
    this.filteredProducts = this.productos.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.page = 1; // ✅ Reinicia la paginación
    this.allLoaded = false; // ✅ Habilita nuevamente el scroll infinito

    if (category === 'todo') {
      this.filteredProducts = this.productos.slice(0, this.limit);
    } else {
      this.filteredProducts = this.productos
        .filter((product) => product.category === category)
        .slice(0, this.limit);
    }
  }

  loadData(event: any) {
    if (this.allLoaded) {
      event.target.complete();
      return;
    }

    setTimeout(() => {
      const startIndex = this.page * this.limit;
      const nextProducts = this.productos
        .filter(product => this.selectedCategory === 'todo' || product.category === this.selectedCategory)
        .slice(startIndex, startIndex + this.limit);

      if (nextProducts.length === 0) {
        this.allLoaded = true;
        event.target.disabled = true;
      } else {
        this.filteredProducts = [...this.filteredProducts, ...nextProducts];
        this.page++;
      }
      event.target.complete();
    }, 1000);
  }

  goToProductDetails(productId: number) {
    this.router.navigate(['/describir-producto', productId]);
  }

  addToCart(product: any, event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(product);
    this.showToast(`🛒 ${product.title} añadido al carrito`);
  }

  updateCartCount() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  buyNow(product: any, event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(product);
    this.showToast(`⚡ ${product.title} añadido al carrito`);
    this.router.navigate(['/cart']);
  }
}
