import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';
import { Email } from '../models/email.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  courses: any;
  coursecodes = [];
  emailToSend: Email;
  EmailForm: FormGroup;
  selected: boolean;
  selectedCourse:Course;


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

    this.EmailForm=new FormGroup({
      'subject': new FormControl(),
      'body': new FormControl()
    })
  
  }

  onSend(){
    this.courseService.sendEmail("mik22@mail.aub.edu","mik22@mail.aub.edu", this.EmailForm.get('subject').value, this.EmailForm.get('body').value);
    this.EmailForm.reset();
  }

  onSelect(crs:Course){
    this.selected = true;
    this.selectedCourse = crs;
  }

}
