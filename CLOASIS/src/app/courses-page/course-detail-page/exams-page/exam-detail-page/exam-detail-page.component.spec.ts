import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetailPageComponent } from './exam-detail-page.component';

describe('ExamDetailPageComponent', () => {
  let component: ExamDetailPageComponent;
  let fixture: ComponentFixture<ExamDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
