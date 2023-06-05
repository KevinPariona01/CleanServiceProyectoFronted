import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacionEditarComponent } from './recomendacion-editar.component';

describe('RecomendacionEditarComponent', () => {
  let component: RecomendacionEditarComponent;
  let fixture: ComponentFixture<RecomendacionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendacionEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomendacionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
