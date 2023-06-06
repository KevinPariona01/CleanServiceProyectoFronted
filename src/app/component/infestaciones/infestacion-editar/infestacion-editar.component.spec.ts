import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfestacionEditarComponent } from './infestacion-editar.component';

describe('InfestacionEditarComponent', () => {
  let component: InfestacionEditarComponent;
  let fixture: ComponentFixture<InfestacionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfestacionEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfestacionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
