import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposInstrumentosComponent } from './tipos-instrumentos.component';

describe('TiposInstrumentosComponent', () => {
  let component: TiposInstrumentosComponent;
  let fixture: ComponentFixture<TiposInstrumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposInstrumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposInstrumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
