import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GradesService } from 'src/app/services/grades.service';
import { StudentGrade } from 'src/app/models/student-grade.model';
import { ExamService } from 'src/app/services/exam.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-exam-detail-page',
  templateUrl: './exam-detail-page.component.html',
  styleUrls: ['./exam-detail-page.component.css']
})
export class ExamDetailPageComponent implements OnInit {
  Grades: StudentGrade[]
  editgrade_id: String="";
  @ViewChild('grade') grade: ElementRef;

  constructor(private gradeservice: GradesService,private examService:ExamService,private courseService:CourseService) { }

  ngOnInit(): void {
    this.examService.getGradesOfExam(this.courseService.currentCourse.crn,this.examService.currentExam);
    this.examService.studentGradesEmitter.subscribe( grades => {
      this.Grades = grades;
    });
  }
disableEdit(){
  this.editgrade_id="";
}

onSave(student_id: string){
  this.examService.editExamGrade(this.grade.nativeElement.value,student_id);
  this.editgrade_id="";
}

enableEditMethod(student_id:string){
  this.editgrade_id=student_id;
}

}
