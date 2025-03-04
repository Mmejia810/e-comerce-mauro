import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comprar-producto',
  templateUrl: './comprar-producto.page.html',
  styleUrls: ['./comprar-producto.page.scss'],
  standalone: false,
})
export class ComprarProductoPage implements OnInit {
  checkoutForm: FormGroup;
  cartItems: any[] = [];
  countries = [
    { name: 'Colombia', cities: ['Bogotá', 'Medellín', 'Cartagena'] },
    { name: 'México', cities: ['CDMX', 'Guadalajara', 'Monterrey'] },
    { name: 'Argentina', cities: ['Buenos Aires', 'Córdoba', 'Rosario'] },
  ];
  banks: { [key: string]: string[] } = {
    Colombia: ['Bancolombia', 'Davivienda', 'BBVA'],
    México: ['Banorte', 'Santander', 'BBVA'],
    Argentina: ['Banco Nación', 'Banco Galicia', 'Santander Río'],
  };
  availableCities: string[] = [];
  availableBanks: string[] = [];

  constructor(private fb: FormBuilder, private router: Router, private location: Location) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      cardNumber: ['', [Validators.minLength(16), Validators.pattern('^[0-9]+$')]],
      expiryDate: [''],
      cvv: ['', [Validators.minLength(3), Validators.pattern('^[0-9]+$')]],
      bankName: [''],
      accountNumber: ['', [Validators.pattern('^[0-9]+$')]],
    });
  }

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const storedCart = localStorage.getItem('cart');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
  }

  getTotal(): number {
    if (!this.cartItems || this.cartItems.length === 0) {
      return 0;
    }
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  get paymentMethod() {
    return this.checkoutForm.get('paymentMethod')?.value;
  }

  onCountryChange(event: any) {
    const selectedCountry = event.detail.value;
    const countryData = this.countries.find(c => c.name === selectedCountry);
    this.availableCities = countryData ? countryData.cities : [];
    this.availableBanks = this.banks[selectedCountry] || [];
  }

  onPaymentChange() {
    const paymentMethod = this.checkoutForm.get('paymentMethod')?.value;
    if (paymentMethod === 'creditCard') {
      this.checkoutForm.patchValue({ bankName: '', accountNumber: '' });
    } else if (paymentMethod === 'bankTransfer') {
      this.checkoutForm.patchValue({ cardNumber: '', expiryDate: '', cvv: '' });
    }
  }

  submitOrder() {
    if (this.checkoutForm.valid) {
      if (this.cartItems.length === 0) {
        alert('No hay productos en el carrito.');
        return;
      }

      const storedHistory = localStorage.getItem('purchaseHistory');
      const purchaseHistory = storedHistory ? JSON.parse(storedHistory) : [];

      const newPurchase = {
        id: new Date().getTime(),
        date: new Date().toISOString(),
        items: this.cartItems,
        total: this.getTotal(),
        buyer: {
          firstName: this.checkoutForm.value.firstName,
          lastName: this.checkoutForm.value.lastName,
          country: this.checkoutForm.value.country,
          city: this.checkoutForm.value.city,
          address: this.checkoutForm.value.address,
        },
        paymentMethod: this.checkoutForm.value.paymentMethod
      };

      purchaseHistory.push(newPurchase);
      localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

      // Vaciar el carrito
      localStorage.removeItem('cart');

      alert('¡Compra realizada con éxito!');

      // Redirigir al historial de compras
      this.router.navigate(['/historial-compras']);

    } else {
      alert('Complete todos los campos.');
    }
  }

  goBack() {
    this.location.back(); // Retrocede a la página anterior
  }
}
