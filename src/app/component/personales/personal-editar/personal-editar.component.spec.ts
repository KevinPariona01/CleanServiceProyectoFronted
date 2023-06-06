import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEditarComponent } from './personal-editar.component';

describe('PersonalEditarComponent', () => {
  let component: PersonalEditarComponent;
  let fixture: ComponentFixture<PersonalEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
