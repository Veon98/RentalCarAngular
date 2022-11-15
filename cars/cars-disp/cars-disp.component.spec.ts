import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsDispComponent } from './cars-disp.component';

describe('CarsDispComponent', () => {
  let component: CarsDispComponent;
  let fixture: ComponentFixture<CarsDispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsDispComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
