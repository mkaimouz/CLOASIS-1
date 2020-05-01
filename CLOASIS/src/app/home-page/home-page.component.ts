import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  courses: any;
  coursecodes = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(){
    this.courseService.getALLCourses().subscribe(
      courses => {
        this.courses = courses;
        this.courses.forEach( course => {
          this.coursecodes.push(course["Course's Code"]);
        });
      }
    );
  }

}
