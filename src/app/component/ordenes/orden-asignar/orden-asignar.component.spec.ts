import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenAsignarComponent } from './orden-asignar.component';

describe('OrdenAsignarComponent', () => {
  let component: OrdenAsignarComponent;
  let fixture: ComponentFixture<OrdenAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenAsignarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
