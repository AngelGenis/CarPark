import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminperfilesComponent } from './adminperfiles.component';

describe('AdminperfilesComponent', () => {
  let component: AdminperfilesComponent;
  let fixture: ComponentFixture<AdminperfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminperfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminperfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
