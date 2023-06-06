import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfestacionComponent } from './infestacion.component';

describe('InfestacionComponent', () => {
  let component: InfestacionComponent;
  let fixture: ComponentFixture<InfestacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfestacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
