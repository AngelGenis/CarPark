import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminparkComponent } from './adminpark.component';

describe('AdminparkComponent', () => {
  let component: AdminparkComponent;
  let fixture: ComponentFixture<AdminparkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminparkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
