import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplosiveBonusListComponent } from './explosive-bonus-list.component';

describe('ExplosiveBonusListComponent', () => {
  let component: ExplosiveBonusListComponent;
  let fixture: ComponentFixture<ExplosiveBonusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplosiveBonusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplosiveBonusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
