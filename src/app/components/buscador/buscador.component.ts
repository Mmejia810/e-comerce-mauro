import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
  standalone: false,
})
export class BuscadorComponent {
  @Output() searchEvent = new EventEmitter<string>();

  onSearch(event: any) {
    const query = event.target.value.trim();
    this.searchEvent.emit(query); // Envía el texto ingresado al HomePage
  }
}
