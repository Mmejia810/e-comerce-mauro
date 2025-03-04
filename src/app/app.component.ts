import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  isLoading = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true; // Muestra el loader al iniciar navegación
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading = false; //  Oculta el loader después de la carga
        }, 1500);
      }
    });
  }
}
