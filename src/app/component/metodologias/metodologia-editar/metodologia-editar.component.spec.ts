import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodologiaEditarComponent } from './metodologia-editar.component';

describe('MetodologiaEditarComponent', () => {
  let component: MetodologiaEditarComponent;
  let fixture: ComponentFixture<MetodologiaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodologiaEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodologiaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
