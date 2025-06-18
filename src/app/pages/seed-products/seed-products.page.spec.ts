import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeedProductsPage } from './seed-products.page';

describe('SeedProductsPage', () => {
  let component: SeedProductsPage;
  let fixture: ComponentFixture<SeedProductsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
