import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropellerListComponent } from './propeller-list.component';

describe('PropellerListComponent', () => {
  let component: PropellerListComponent;
  let fixture: ComponentFixture<PropellerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropellerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropellerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
