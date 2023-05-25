import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoEditarComponent } from './periodo-editar.component';

describe('PeriodoEditarComponent', () => {
  let component: PeriodoEditarComponent;
  let fixture: ComponentFixture<PeriodoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodoEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
