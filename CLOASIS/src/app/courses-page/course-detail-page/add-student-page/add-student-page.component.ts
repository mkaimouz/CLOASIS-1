import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-add-student-page',
  templateUrl: './add-student-page.component.html',
  styleUrls: ['./add-student-page.component.css']
})
export class AddStudentPageComponent implements OnInit {

  course: Course;
  students: Student[];

  addStudent(id:string){
    this.courseService.registerStudent(id,this.course.crn);
  }

  constructor(private route: ActivatedRoute,private courseService: CourseService,private router:Router) { }

  ngOnInit() {
    this.course = this.courseService.currentCourse;
    this.courseService.getUnregStudents(this.course.crn);
    this.courseService.unregisteredStudents.subscribe(stds => {
      this.students = stds;
    });
  }

}
