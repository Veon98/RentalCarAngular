import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaRComponent } from './tabella-r.component';

describe('TabellaRComponent', () => {
  let component: TabellaRComponent;
  let fixture: ComponentFixture<TabellaRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabellaRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabellaRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
