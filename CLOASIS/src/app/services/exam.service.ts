import { Injectable } from '@angular/core';
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor() { }

  exams: Exam[]=[
    {exam_id: 1,crn: "22041",duration: 2,room : "Bliss 205",start_time : "15:30:00",title : "Midterm Exam",date : "2020-01-01"},
    {exam_id: 2,crn: "22041",duration: 2,room : "Bliss 205",start_time : "15:30:00",title : "Final Exam",date : "2020-01-01"}
  ];

  get_Exams(crn: string){
    var course_exams: Exam[]=[];
    this.exams.forEach((crs,i:number)=>{
      if (crs.crn===crn){
        course_exams.push(crs);
      }
    })

    return course_exams
  }



  }

