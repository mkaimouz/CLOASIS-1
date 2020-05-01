import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { CourseService } from './services/course.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CLOASIS';

  constructor(
    public courseService: CourseService
  ){}

}
