import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import { Exam } from 'src/app/models/exam.model';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { GradesService } from 'src/app/services/grades.service';


@Component({
  selector: 'app-exams-page',
  templateUrl: './exams-page.component.html',
  styleUrls: ['./exams-page.component.css']
})
export class ExamsPageComponent implements OnInit {
  exams: Exam[];
  course: Course;
  constructor(private examservice: ExamService,private courseservie: CourseService, private gradeservive: GradesService) { }

  ngOnInit(): void {
    this.course=this.courseservie.currentCourse;
    this.examservice.examsEmitter.subscribe( exs => {
      this.exams = exs;
    });
    this.examservice.get_Exams(this.course.crn);
  }

  OnClick(exam: string){
    this.examservice.currentExam = exam;
  }



}
