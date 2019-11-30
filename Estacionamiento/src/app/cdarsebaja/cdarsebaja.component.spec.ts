import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdarsebajaComponent } from './cdarsebaja.component';

describe('CdarsebajaComponent', () => {
  let component: CdarsebajaComponent;
  let fixture: ComponentFixture<CdarsebajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdarsebajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdarsebajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
