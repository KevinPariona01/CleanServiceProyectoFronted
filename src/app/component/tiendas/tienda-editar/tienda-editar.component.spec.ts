import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaEditarComponent } from './tienda-editar.component';

describe('TiendaEditarComponent', () => {
  let component: TiendaEditarComponent;
  let fixture: ComponentFixture<TiendaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendaEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiendaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
