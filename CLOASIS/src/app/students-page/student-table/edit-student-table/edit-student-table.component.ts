import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-student-table',
  templateUrl: './edit-student-table.component.html',
  styleUrls: ['./edit-student-table.component.css']
})
export class EditStudentTableComponent implements OnInit {

  EditForm: FormGroup;
  studentID: string="";
  student: Student;
  constructor(private courseService: CourseService,private router: Router) { }

  ngOnInit(): void {
    this.studentID=this.courseService.editStudent_ID;
    this.student=this.courseService.getStudent(this.studentID);
    this.EditForm=new FormGroup({
      'ID': new FormControl(this.student.studentid,[Validators.required]) ,
      'Name': new FormControl(this.student.name,[Validators.required]) ,
      'Email': new FormControl(this.student.email,[Validators.required,Validators.email]) ,
      'Phone': new FormControl(this.student.phone,[Validators.required]) ,
      'Gender':new FormControl(this.student.gender,[Validators.required]) ,
      'TeamID': new FormControl(this.student.teaM_ID,[Validators.required]) ,
      'DOB': new FormControl(this.student.dob,[Validators.required]) 
    })
  }
  onSubmit(){
    if(this.EditForm.valid){
      this.courseService.editStudent(this.student.studentid,{studentid:this.EditForm.get('ID').value,name: this.EditForm.get('Name').value,email: this.EditForm.get('Email').value,teaM_ID: this.EditForm.get('TeamID').value,phone:this.EditForm.get('Phone').value,dob:this.EditForm.get('DOB').value,gender:this.EditForm.get('Gender').value});
      this.router.navigate(['/HOMEPAGE' ]);
    }
    }

  onCancel(){
    this.router.navigate(['/HOMEPAGE' ]);
  }
  }

