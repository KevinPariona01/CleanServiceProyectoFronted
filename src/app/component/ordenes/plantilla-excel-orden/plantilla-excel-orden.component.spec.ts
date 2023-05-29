import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaExcelOrdenComponent } from './plantilla-excel-orden.component';

describe('PlantillaExcelOrdenComponent', () => {
  let component: PlantillaExcelOrdenComponent;
  let fixture: ComponentFixture<PlantillaExcelOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaExcelOrdenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaExcelOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
