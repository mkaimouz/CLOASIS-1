import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-team-manager-page',
  templateUrl: './team-manager-page.component.html',
  styleUrls: ['./team-manager-page.component.css']
})
export class TeamManagerPageComponent implements OnInit {

  
  teams: Team[] = [];

  delete(id:string,prj:number){

  }

  constructor(private teamService:TeamService,private courseService:CourseService,private route:Router) { }

  ngOnInit(): void {
    this.teamService.getTeamsOfCourse();
    this.teamService.getTeams
      .subscribe( teams => {
        this.teams = teams;
      });
  }

}
