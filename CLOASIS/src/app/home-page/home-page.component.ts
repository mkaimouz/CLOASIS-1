import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';
import { Email } from '../models/email.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from '../models/student.model';

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
  selectedCourseCode:string;
  students: Student[] = [];
  a: Course;
  classes : Course[] = [];
  studentIds: string[] = [];

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
    let recepients: string = "";
    for (let std in this.students){
      recepients = recepients + this.students[std].email + ",";
    }
    recepients = recepients.substr(0, recepients.length - 1);
    this.courseService.sendEmail("mik22@mail.aub.edu",recepients, this.EmailForm.get('subject').value, this.EmailForm.get('body').value);
    this.EmailForm.reset();
  }

  onSelect(crs:string){
    this.classes = [];
    this.students = [];
    let r: Student;
    this.selected = true;
    this.selectedCourseCode = crs;
    this.courseService.fetchClassesByCode(crs).subscribe(res => {
      for (let key in res){
        this.a = {crn:res[key]["CRN"], name: "N/A", coursecode: "N/A", room: "N/A", professor: "N/A", progress: 50,profEmail:"",profOffice:"",description:"",credits:3,sectionNum:1,semester:""}
        this.classes.push(this.a);
      }
      for (let cls in this.classes){
        this.courseService.FetchStudentInClass(this.classes[cls].crn).subscribe(res2 => {
          for (let key in res2){
            this.courseService.FetchStudentById(res2[key]["STUDENTID"]).subscribe(res3 => {
              for (let k in res3){
                r = {studentid:res3[k]["studentid"], teaM_ID: "N/A", email:res3[k]["email"], name:"N/A", phone:"N/A", dob:"N/A", gender:"N/A"}
              this.students.push(r);
              }
              
            });
          }
        });
      }
    });

  }

}
