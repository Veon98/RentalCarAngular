import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenFormComponent } from './pren-form.component';

describe('PrenFormComponent', () => {
  let component: PrenFormComponent;
  let fixture: ComponentFixture<PrenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrenFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
