import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student.model';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  EditForm: FormGroup;
  studentID: string="";
  student: Student;
  gen:string;
  constructor(private courseService: CourseService,private router: Router) { }

  ngOnInit(): void {
    this.studentID=this.courseService.editStudent_ID;
    this.student=this.courseService.getStudent(this.studentID);
    this.EditForm=new FormGroup({
      'ID': new FormControl(this.student.studentid,[Validators.required,Validators.pattern('[0-9]{9,9}$')]),
      'Name': new FormControl(this.student.name,[Validators.required,Validators.pattern('[A-Z][a-z]+[ ][A-Z][a-z]+')]) ,
      'Email': new FormControl(this.student.email,[Validators.required,Validators.email]) ,
      'Phone': new FormControl(this.student.phone,[Validators.required,Validators.pattern('[+][0-9]{1,3}[ ]*[0-9]*[ ]*[0-9]+')]) ,
      'Gender':new FormControl(this.student.gender,[Validators.required]) ,
      'DOB': new FormControl(this.student.dob,[Validators.required]) 
    })
  }
  onSubmit(){
    if(this.EditForm.valid){
      this.gen = this.EditForm.get('Gender').value

      if (this.gen === 'Male'){
        this.gen = 'M';
      }
      else if (this.gen === 'Female'){
        this.gen = 'F';
      }
      else if (this.gen === 'Rather Not To Say'){
        this.gen = 'O';
      }

      this.courseService.addStudent("",this.EditForm.get('ID').value,null,this.EditForm.get('Name').value,this.EditForm.get('Email').value,this.EditForm.get('Phone').value,this.EditForm.get('DOB').value,this.gen);
      this.router.navigate(['/STUDENTSPAGE' ]);
    }
    }

  onCancel(){
    this.router.navigate(['/STUDENTSPAGE' ]);
  }

}
