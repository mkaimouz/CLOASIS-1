import { Injectable } from '@angular/core';
import { Exam } from '../models/exam.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CourseService } from './course.service';
import { StudentGrade } from '../models/student-grade.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Accept' : 'q=0.8;application/json;q=0.9'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  examsEmitter = new Subject<Exam[]>();
  studentGradesEmitter = new Subject<StudentGrade[]>();
  currentExam:string;

  constructor(private http:HttpClient,private courseService:CourseService) { }

  editExamGrade(grade:number,stdID:string){
    this.http.get('https://cloasisapi.azurewebsites.net/Grade/GetGradesOfStudentInClass/'+stdID+'/'+this.courseService.currentCourse.crn,httpOptions).subscribe( grds => {
      for(let gr in grds){
        if(grds[gr]["GRADE_DESC"]===this.currentExam){
          this.http.put('https://cloasisapi.azurewebsites.net/Grade/EditGrade/'+grds[gr]["GRADE_ID"],{"GRADE_ID":grds[gr]["GRADE_ID"],"REPORT_ID":grds[gr]["REPORT_ID"],"STUDENTID":grds[gr]["STUDENTID"],"NAME":grds[gr]["NAME"]
            ,"GRADE":grade,"GRADE_DESC":grds[gr]["GRADE_DESC"],"COURSE_NAME":grds[gr]["COURSE_NAME"],"COURSE_CODE":grds[gr]["COURSE_CODE"],"SECTION_NUM":grds[gr]["SECTION_NUM"],"CRN":grds[gr]["CRN"]},httpOptions);
        }
      }
    });
    this.getGradesOfExam(this.courseService.currentCourse.crn,this.currentExam);
  }
  

  get_Exams(crn: string,a:Exam[]=[]){
    this.http.get('https://cloasisapi.azurewebsites.net/Lecture/GetExamsDetailsOfClass/'+crn,httpOptions).subscribe( exams => {
      for(let ex in exams){
        a.push({exam_id: exams[ex]["LECTURE_ID"],crn: exams[ex]["CRN"],
          duration: exams[ex]["DURATION"],
          room : exams[ex]["ROOM"],
          start_time : exams[ex]["START_TIME"],
          title : exams[ex]["DESCRIPTION"],
          date : exams[ex]["LECTURE_DATE"]});
      }
      this.examsEmitter.next(a);
    });
  }

  getGradesOfExam(crn:string,exam:string,a:StudentGrade[]=[]){
    this.http.get('https://cloasisapi.azurewebsites.net/Grade/GetGradesOfClass/'+crn,httpOptions).subscribe(stds => {
      for(let std in stds){
        if(stds[std]["GRADE_DESC"]===exam){
          a.push({grade_id:stds[std]["GRADE_ID"],student_id:stds[std]["STUDENTID"],name:stds[std]["NAME"],grade:stds[std]["GRADE"],description:stds[std]["GRADE_DESC"]});
        }
      }
      this.studentGradesEmitter.next(a);
    });
  }



  }

