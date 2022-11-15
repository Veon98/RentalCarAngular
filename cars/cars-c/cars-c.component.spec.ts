import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsCComponent } from './cars-c.component';

describe('CarsCComponent', () => {
  let component: CarsCComponent;
  let fixture: ComponentFixture<CarsCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
