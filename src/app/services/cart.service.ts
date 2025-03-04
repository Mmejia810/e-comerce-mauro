import { Injectable } from '@angular/core'; // Importa Injectable para que el servicio pueda ser inyectado en otros componentes.
import { BehaviorSubject } from 'rxjs'; // Importa BehaviorSubject para manejar estados reactivos.

@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible globalmente sin necesidad de declararlo en un módulo.
})
export class CartService {
  private cart: any[] = []; // 📌 Arreglo que almacena los productos en el carrito.
  private cartItemCount = new BehaviorSubject<number>(0); //  Contador reactivo de la cantidad total de productos.
  cartUpdated = new BehaviorSubject<any[]>([]); //  Notificación de cambios en el carrito para actualizar la vista.

  constructor() {
    this.loadCart(); //  Carga el carrito desde localStorage al iniciar el servicio.
  }

  getCartItemCountObservable() {
    return this.cartItemCount.asObservable(); //  Permite que otros componentes escuchen cambios en la cantidad total de productos.
  }

  getCartUpdatedObservable() {
    return this.cartUpdated.asObservable(); //  Permite que otros componentes escuchen cambios en el contenido del carrito.
  }

  private updateCartState() {
    this.cartItemCount.next(this.getCartItemCount()); //  Actualiza el contador de productos en el carrito.
    this.cartUpdated.next([...this.cart]); //  Notifica a los componentes que el carrito ha cambiado.
  }

  private loadCart() {
    const storedCart = localStorage.getItem('cart'); //  Obtiene los datos del carrito almacenados en localStorage.
    this.cart = storedCart ? JSON.parse(storedCart) : []; //  Si hay datos guardados, los parsea, si no, deja un arreglo vacío.
    this.updateCartState(); //  Actualiza el estado del carrito después de cargarlo.
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart)); //  Guarda el carrito actualizado en localStorage.
    this.updateCartState(); //  Notifica cambios en el estado del carrito.
  }

  addToCart(product: any) {
    const existingProduct = this.cart.find((item) => item.id === product.id); //  Verifica si el producto ya está en el carrito.
    if (existingProduct) {
      existingProduct.quantity++; //  Si el producto ya existe, aumenta la cantidad en 1.
    } else {
      this.cart.push({ ...product, quantity: 1 }); //  Si el producto no está, lo agrega con cantidad 1.
    }
    this.saveCart(); //  Guarda el estado del carrito en localStorage y notifica cambios.
  }

  updateQuantity(productId: number, quantity: number) {
    const index = this.cart.findIndex((item) => item.id === productId); //  Busca el índice del producto en el carrito.
    if (index !== -1) { //  Si el producto existe en el carrito:
      this.cart[index].quantity = quantity; //  Actualiza la cantidad del producto.
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1); //  Si la cantidad es 0 o menor, elimina el producto del carrito.
      }
      this.saveCart(); //  Guarda los cambios y notifica la actualización del carrito.
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId); //  Filtra el carrito eliminando el producto con el ID dado.
    this.saveCart(); //  Guarda los cambios y notifica la actualización del carrito.
  }

  getCart() {
    return this.cart; //  Retorna el carrito actual sin necesidad de suscribirse a un Observable.
  }

  clearCart() {
    this.cart = []; //  Vacía el carrito.
    this.saveCart(); //  Guarda los cambios y notifica que el carrito se ha vaciado.
  }

  getCartItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0); // Calcula la cantidad total de productos en el carrito.
  }
}
