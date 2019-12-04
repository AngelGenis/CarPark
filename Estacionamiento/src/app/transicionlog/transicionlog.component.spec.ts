import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransicionlogComponent } from './transicionlog.component';

describe('TransicionlogComponent', () => {
  let component: TransicionlogComponent;
  let fixture: ComponentFixture<TransicionlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransicionlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransicionlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
