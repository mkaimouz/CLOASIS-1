import { Injectable } from '@angular/core';
import { Report } from '../models/report.model';
import { CLO } from '../models/clo.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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
export class ReportService {

  reportEmitter = new Subject<Report[]>();

  get_report_dates(ids:string[],a:Report[]=[]){
    for(let k in ids){
      this.http.get('https://cloasisapi.azurewebsites.net/Report/GetReportOfId/'+ids[k],httpOptions).subscribe( reps => {
        a.push({report_id:reps[0]["REPORT_ID"],report_date:reps[0]["REPORT_DATE"]});
        this.reportEmitter.next(a);
      })
    }
  }

  constructor(private http:HttpClient) { }

}
