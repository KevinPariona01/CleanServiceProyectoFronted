import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecieEditarComponent } from './especie-editar.component';

describe('EspecieEditarComponent', () => {
  let component: EspecieEditarComponent;
  let fixture: ComponentFixture<EspecieEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecieEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecieEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
