import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescribirProductoPage } from './describir-producto.page';

describe('DescribirProductoPage', () => {
  let component: DescribirProductoPage;
  let fixture: ComponentFixture<DescribirProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DescribirProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
