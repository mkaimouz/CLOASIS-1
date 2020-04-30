import { Component, OnInit, OnChanges } from '@angular/core';
import { CourseService } from '../services/course.service';
import { RoutingExtrasService } from '../services/routing-extras.service';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  courses: any;
  coursecodes = [];
  currentCourse = null;

  selectCourse(course: string){
    this.currentCourse = course;
    this.courseService.setCourse(course);
    this.routingExtras.setCoursePage("Students");
  }

  constructor(private courseService: CourseService,private routingExtras:RoutingExtrasService) { }

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
