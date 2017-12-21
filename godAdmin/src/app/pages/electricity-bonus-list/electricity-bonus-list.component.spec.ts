import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityBonusListComponent } from './electricity-bonus-list.component';

describe('ElectricityBonusListComponent', () => {
  let component: ElectricityBonusListComponent;
  let fixture: ComponentFixture<ElectricityBonusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricityBonusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityBonusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
