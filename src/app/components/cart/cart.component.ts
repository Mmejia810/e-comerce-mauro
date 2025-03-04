import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false,
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
    this.cartService.cartUpdated.subscribe(() => this.loadCart()); // Se suscribe para detectar cambios
  }

  loadCart() {
    this.cartItems = [...this.cartService.getCart()];
  }

  updateQuantity(id: number, quantity: number) {
    if (quantity < 1) {
      this.removeItem(id);
    } else {
      this.cartService.updateQuantity(id, quantity);
      this.loadCart();
    }
  }

  removeItem(id: number) {
    this.cartService.updateQuantity(id, 0);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  goToCartPage() {
    this.router.navigate(['/cart']);
  }
}
