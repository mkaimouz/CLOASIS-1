import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { Team } from '../models/team.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  getTeams = new Subject<Team[]>();

  teams: Team[] = [
    {teaM_ID:1,crn:"202020",teaM_NAME:"Cloasis",creatioN_DATE:"2020-01-26T00:00:00"},
    {teaM_ID:2,crn:"202020",teaM_NAME:"Clinic",creatioN_DATE:"2020-01-26T00:00:00"},
  ];

  constructor(private courseService:CourseService) { }
}
