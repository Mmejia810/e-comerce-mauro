import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComprarProductoPage } from './comprar-producto.page';

describe('ComprarProductoPage', () => {
  let component: ComprarProductoPage;
  let fixture: ComponentFixture<ComprarProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
