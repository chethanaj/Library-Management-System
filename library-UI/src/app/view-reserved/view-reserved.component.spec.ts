import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReservedComponent } from './view-reserved.component';

describe('ViewReservedComponent', () => {
  let component: ViewReservedComponent;
  let fixture: ComponentFixture<ViewReservedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReservedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReservedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
