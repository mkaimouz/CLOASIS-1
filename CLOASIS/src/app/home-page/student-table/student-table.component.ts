import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  students: Student[]
  editstudent_ID:string="";
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.students=this.courseService.getStudents();
  }

  remove(ID: string){

  }

  enableEditMethod(ID: string){
    this.courseService.editStudent_ID=ID;
  }
  disableEdit(){
    this.courseService.editStudent_ID="";
  }

  onSave(ID: string){
    this.disableEdit();
  }

}
