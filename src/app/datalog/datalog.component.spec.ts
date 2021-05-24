import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalogComponent } from './datalog.component';

describe('DatalogComponent', () => {
  let component: DatalogComponent;
  let fixture: ComponentFixture<DatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
