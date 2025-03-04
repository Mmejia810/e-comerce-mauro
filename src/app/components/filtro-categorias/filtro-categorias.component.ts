import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filtro-categorias',
  templateUrl: './filtro-categorias.component.html',
  styleUrls: ['./filtro-categorias.component.scss'],
  standalone: false,
})
export class FiltroCategoriasComponent {
  @Input() categorias: string[] = [];
  @Output() categoryEvent = new EventEmitter<string>();

  onCategoryChange(event: any) {
    this.categoryEvent.emit(event.detail.value);
  }
}
