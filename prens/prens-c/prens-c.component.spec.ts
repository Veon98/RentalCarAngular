import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrensCComponent } from './prens-c.component';

describe('PrensCComponent', () => {
  let component: PrensCComponent;
  let fixture: ComponentFixture<PrensCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrensCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrensCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
