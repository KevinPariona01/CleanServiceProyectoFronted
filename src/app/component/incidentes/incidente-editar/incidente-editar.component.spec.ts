import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenteEditarComponent } from './incidente-editar.component';

describe('IncidenteEditarComponent', () => {
  let component: IncidenteEditarComponent;
  let fixture: ComponentFixture<IncidenteEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidenteEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
