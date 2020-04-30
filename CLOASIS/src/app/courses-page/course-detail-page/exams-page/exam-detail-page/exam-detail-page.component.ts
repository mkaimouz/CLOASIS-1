import { Component, OnInit } from '@angular/core';
import { GradesService } from 'src/app/services/grades.service';
import { StudentGrade } from 'src/app/models/student-grade.model';

@Component({
  selector: 'app-exam-detail-page',
  templateUrl: './exam-detail-page.component.html',
  styleUrls: ['./exam-detail-page.component.css']
})
export class ExamDetailPageComponent implements OnInit {
  Grades: StudentGrade[]
  editgrade_id: String="";
  constructor(private gradeservice: GradesService) { }

  ngOnInit(): void {
    this.Grades=this.gradeservice.get_student_grades()
  }
disableEdit(){
  this.editgrade_id="";
}

onSave(student_id: string){
  this.editgrade_id="";
}

enableEditMethod(student_id:string){
  this.editgrade_id=student_id;
}

}
