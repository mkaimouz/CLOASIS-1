import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';
import { Course } from 'src/app/models/course.model';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { GradesService } from 'src/app/services/grades.service';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-assignments-page',
  templateUrl: './assignments-page.component.html',
  styleUrls: ['./assignments-page.component.css']
})
export class AssignmentsPageComponent implements OnInit {
assignments: Assignment[];
course: Course;
reports: Report[];

  constructor(private assignmentservice: AssignmentService, private courseserive: CourseService,private gradeservie: GradesService,private reportservice: ReportService) { }

  ngOnInit(): void {
    this.course=this.courseserive.currentCourse
    this.assignmentservice.get_assignments(this.course.crn);
    this.assignmentservice.assignmentsEmitter.subscribe( gg => {
      var repIDs: string[]=[];
      this.assignments = gg;
      for(let k in gg){
        repIDs.push(gg[k]["report_id"]);
      }
      this.reportservice.get_report_dates(repIDs);
    });
    this.reportservice.reportEmitter.subscribe( reps => {
      this.reports = reps;
    });
  }

  get_report_date(id:string){
    for(let k in this.reports){
      if(this.reports[k]["report_id"] === id){
        return this.reports[k]["report_date"];
      }
    }
    return "";
  }

}
