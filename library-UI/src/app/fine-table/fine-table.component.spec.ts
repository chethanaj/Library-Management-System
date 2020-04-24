import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FineTableComponent } from './fine-table.component';

describe('FineTableComponent', () => {
  let component: FineTableComponent;
  let fixture: ComponentFixture<FineTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FineTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
