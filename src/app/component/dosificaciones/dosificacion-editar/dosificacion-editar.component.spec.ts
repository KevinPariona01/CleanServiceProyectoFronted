import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosificacionEditarComponent } from './dosificacion-editar.component';

describe('DosificacionEditarComponent', () => {
  let component: DosificacionEditarComponent;
  let fixture: ComponentFixture<DosificacionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DosificacionEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DosificacionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
