import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { Team } from '../models/team.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Accept' : 'q=0.8;application/json;q=0.9'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  getTeams = new Subject<Team[]>();
  getProjects = new Subject<Project[]>();

  getTeamsOfCourse(a:Team[]=[], b:Project = null){
    this.http.get('https://cloasisapi.azurewebsites.net/Team/FetchTeam/'+this.courseService.currentCourse.coursecode,httpOptions).subscribe( tms => {
      for(let tm in tms){
        this.http.get('https://cloasisapi.azurewebsites.net/Project/FetchProject/'+tms[tm]["TEAM_NAME"],httpOptions).subscribe( prj => {
          b = prj[0];
          a.push({teaM_ID:tms[tm]["TEAM_ID"],teaM_NAME:tms[tm]["TEAM_NAME"],creatioN_DATE: tms[tm]["CREATION_DATE"],courseName: tms[tm]["COURSE_NAME"],courseCode: tms[tm]["COURSE_CODE"],sectionNum:tms[tm]["SECTION_NUM"],project_Title:b["Project_Title"],project_Desc:b["Project_Desc"],projID:b["project_ID"]});
        });
      }
      this.getTeams.next(a);
    });
  }

  deleteTeam(id:string,prj:number){
    this.http.delete('https://cloasisapi.azurewebsites.net/Project/DeleteProject/'+prj,httpOptions).subscribe();
    this.http.delete('https://cloasisapi.azurewebsites.net/Team/DeleteTeam/'+id,httpOptions).subscribe();
    this.getTeamsOfCourse();
  }

  constructor(private courseService:CourseService,private http:HttpClient) { }
}
