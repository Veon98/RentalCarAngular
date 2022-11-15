import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepilogoPrensComponent } from './riepilogo-prens.component';

describe('RiepilogoPrensComponent', () => {
  let component: RiepilogoPrensComponent;
  let fixture: ComponentFixture<RiepilogoPrensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiepilogoPrensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiepilogoPrensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
