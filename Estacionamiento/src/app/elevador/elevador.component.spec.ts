import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevadorComponent } from './elevador.component';

describe('ElevadorComponent', () => {
  let component: ElevadorComponent;
  let fixture: ComponentFixture<ElevadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElevadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
