import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShieldListComponent } from './shield-list.component';

describe('ShieldListComponent', () => {
  let component: ShieldListComponent;
  let fixture: ComponentFixture<ShieldListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShieldListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShieldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
