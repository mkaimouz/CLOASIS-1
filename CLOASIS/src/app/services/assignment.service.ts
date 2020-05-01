import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Accept' : 'q=0.8;application/json;q=0.9'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  assignmentsEmitter = new Subject<Assignment[]>();

get_assignments(crn: string,a:Assignment[]=[]){
  this.http.get('https://cloasisapi.azurewebsites.net/Grade/GetGradesStatsOfClass/'+crn,httpOptions).subscribe(grds => {
    for(let k in grds){
      if(grds[k]["GRADE_DESC"] === "Assignment 1" || grds[k]["GRADE_DESC"] === "Assignment 2"){
        a.push({course_crn:crn,report_id:grds[k]["REPORT_ID"],description:grds[k]["GRADE_DESC"],grade:grds[k]["Average"]});
      }
    }
    this.assignmentsEmitter.next(a);
  });

}

  constructor(private http:HttpClient) { }

}
