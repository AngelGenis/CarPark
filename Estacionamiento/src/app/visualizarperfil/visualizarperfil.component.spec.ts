import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarperfilComponent } from './visualizarperfil.component';

describe('VisualizarperfilComponent', () => {
  let component: VisualizarperfilComponent;
  let fixture: ComponentFixture<VisualizarperfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarperfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
