import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  course: Course;
  addForm: FormGroup;
  student: Student;

  onSubmit(){
    if(this.addForm.valid){
      this.courseService.editStudent(this.student.studentid,{studentid:this.student.studentid,name: this.addForm.get('name').value,email: this.addForm.get('email').value,teaM_ID: this.student.teaM_ID,
        phone:this.addForm.get('phone').value,dob:this.addForm.get('dob').value,gender:this.addForm.get('gender').value});
      this.router.navigate(['/COURSEDETAILPAGE/' + this.course.coursecode]);
    }
  }

  constructor(private route: ActivatedRoute,private courseService: CourseService,private router:Router) { }

  ngOnInit() {
    this.course = this.courseService.currentCourse;
    this.student = this.courseService.currentStudent;

      this.addForm = new FormGroup({
        'name' : new FormControl(this.student.name,[Validators.required]),
        'id' : new FormControl(this.student.studentid,[Validators.required]),
        'email' : new FormControl(this.student.email,[Validators.required,Validators.email]),
        'phone' : new FormControl(this.student.phone,[Validators.required]),
        'dob' : new FormControl(this.student.dob,[Validators.required]),
        'gender' : new FormControl(this.student.gender,[Validators.required]),
      });
  }

}
