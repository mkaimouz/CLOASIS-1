import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Subscription } from 'rxjs';
import { GradesService } from 'src/app/services/grades.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Accept' : 'q=0.8;application/json;q=0.9'
  })
};

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  course: Course;
  students: Student[];
  selectedStudent: Student = {studentid: "",name: "Please select a Student",email:"",teaM_ID: "",phone:"",dob:"",gender:""};
  selectedStudentGrades: number[] = [0,0,0,0];
  change: boolean = false;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  public barChartLabels = ['Assignment 1', 'Assignment 2', 'Midterm Exam', 'Final Exam'];
  public barChartType = 'bar';
  public barChartLegend = false;

  public barChartData = [
    {data: this.selectedStudentGrades}
  ];


  
  selectStudent(id:string){
    this.change = true;
    this.courseService.getStudent(id);
    
  }

  delete(id:string){
    this.courseService.unregisterStudent(id,this.course.crn);
  }

  constructor(private route: ActivatedRoute,private courseService: CourseService
    ,private router:Router,private gradesService:GradesService,private http:HttpClient) { }

  private sub: Subscription; 
  private selectedGrades: Subscription;

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          
          this.http.get('https://cloasisapi.azurewebsites.net/Class/FetchClass/'+this.courseService.currentCourseCode,httpOptions).toPromise().then( course => {
        this.course = {crn:course[0]["CRN"], name: "N/A", coursecode: "N/A", room: "N/A", professor: "N/A", progress: 50,profEmail:"",profOffice:"",description:"",credits:3,sectionNum:1,semester:""}
        this.students = this.courseService.getCourseStudents(this.course.crn);
      });
        }
      );
    this.courseService.selectedStudent.subscribe( std => {
      this.selectedStudent = std;
      this.gradesService.getStudentGradesInClass(this.selectedStudent.studentid,this.course.crn);
    });
    this.sub = this.courseService.studentsEmitter.subscribe(data => {
    this.students = data;
    });

    this.selectedGrades = this.gradesService.selectedStudentGradesEmmitter
      .subscribe(
        (grades:number[]) => {
          this.selectedStudentGrades = grades;
          this.barChartData.forEach((dataset, index)=>{
            this.barChartData[index] = Object.assign({},this.barChartData[index], {
                data: this.selectedStudentGrades
              });
            });
            this.change = false;
        }
      );
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
