import { Component, OnInit } from '@angular/core';
import { GradesService } from 'src/app/services/grades.service';
import { CourseService } from 'src/app/services/course.service';
import { Student } from 'src/app/models/student.model';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-statistics-page',
  templateUrl: './course-statistics-page.component.html',
  styleUrls: ['./course-statistics-page.component.css']
})
export class CourseStatisticsPageComponent implements OnInit {

  course: Course;
  generalAverage: number;
  numberOfStudents: number;
  standDev:number;
  topStudent: Student;
  topAvg: number;
  top:any;
  pieChart:any;

  pieChartOptions = {
      responsive: true,
      legend : {
        labels:{
          fontColor: "white"
        }
     },
  }

  pieChartData:any = [
    { 
        data: null
    }
  ];

  pieChartLabels =  null;

  pieChartColor:any = [
    {
        backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 90, 0.9)'
        ]
    }
  ]

  constructor(private gradesService: GradesService,private courseService: CourseService) { }

  ngOnInit(): void {

    this.course = this.courseService.currentCourse;
    this.gradesService.getGeneralAverage(this.course.crn);
    this.gradesService.generalAverageEmitter.subscribe( gg => {
      this.generalAverage = +gg;
    })
    this.gradesService.getNoOfStudents(this.course.crn);
    this.gradesService.NoOfStudentsEmitter.subscribe( gg => {
      this.numberOfStudents = gg;
    });
    this.gradesService.getStandardDev(this.course.crn);
    this.gradesService.StandardDeviationEmitter.subscribe( grds => {
      this.standDev = +grds;
    });
    this.top = this.gradesService.getTopStudent(this.course.crn);
    this.topStudent = this.top[0];
    this.topAvg = this.top[1];
    this.pieChart = this.gradesService.getPieChart(this.course.crn);
    this.pieChartData = [{data:this.pieChart[1]}];
    this.pieChartLabels = this.pieChart[0];

  }

}
