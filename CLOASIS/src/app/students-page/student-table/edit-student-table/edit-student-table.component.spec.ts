import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentTableComponent } from './edit-student-table.component';

describe('EditStudentTableComponent', () => {
  let component: EditStudentTableComponent;
  let fixture: ComponentFixture<EditStudentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
