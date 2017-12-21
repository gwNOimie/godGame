import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DronesListComponent } from './drones-list.component';

describe('DronesListComponent', () => {
  let component: DronesListComponent;
  let fixture: ComponentFixture<DronesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DronesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DronesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
