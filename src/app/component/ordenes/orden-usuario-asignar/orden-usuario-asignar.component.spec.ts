import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenUsuarioAsignarComponent } from './orden-usuario-asignar.component';

describe('OrdenUsuarioAsignarComponent', () => {
  let component: OrdenUsuarioAsignarComponent;
  let fixture: ComponentFixture<OrdenUsuarioAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenUsuarioAsignarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenUsuarioAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
