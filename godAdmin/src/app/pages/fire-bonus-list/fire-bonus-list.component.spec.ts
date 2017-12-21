import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireBonusListComponent } from './fire-bonus-list.component';

describe('FireBonusListComponent', () => {
  let component: FireBonusListComponent;
  let fixture: ComponentFixture<FireBonusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireBonusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireBonusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
