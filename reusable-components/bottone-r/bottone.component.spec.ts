import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottoneComponent } from './bottone.component';

describe('BottoneComponent', () => {
  let component: BottoneComponent;
  let fixture: ComponentFixture<BottoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
