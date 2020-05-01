import { Component, OnInit } from '@angular/core';
import { CLO } from 'src/app/models/clo.model';
import { ReportService } from 'src/app/services/report.service';
import { CourseService } from 'src/app/services/course.service';
@Component({
  selector: 'app-course-clo-page',
  templateUrl: './course-clo-page.component.html',
  styleUrls: ['./course-clo-page.component.css']
})
export class CourseCLOPageComponent implements OnInit {
clos: CLO[];
  constructor(private reportservice: ReportService,private courseservie: CourseService) { }

  ngOnInit(): void {
  }

}
