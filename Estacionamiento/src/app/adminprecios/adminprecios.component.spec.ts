import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpreciosComponent } from './adminprecios.component';

describe('AdminpreciosComponent', () => {
  let component: AdminpreciosComponent;
  let fixture: ComponentFixture<AdminpreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
