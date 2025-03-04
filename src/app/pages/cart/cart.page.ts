import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router, private location: Location) {}

  ngOnInit() {
    this.loadCart();
    this.cartService.cartUpdated.subscribe(() => this.loadCart()); // Detecta cambios en el carrito
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

  goToCheckout() {
    this.router.navigate(['/comprar-producto']);
  }
  goBack() {
    this.location.back(); // Retrocede a la página anterior
  }
}
