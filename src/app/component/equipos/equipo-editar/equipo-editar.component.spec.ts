import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoEditarComponent } from './equipo-editar.component';

describe('EquipoEditarComponent', () => {
  let component: EquipoEditarComponent;
  let fixture: ComponentFixture<EquipoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipoEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
