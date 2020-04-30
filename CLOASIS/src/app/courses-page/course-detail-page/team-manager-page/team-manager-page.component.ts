import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-manager-page',
  templateUrl: './team-manager-page.component.html',
  styleUrls: ['./team-manager-page.component.css']
})
export class TeamManagerPageComponent implements OnInit {

  AllTeams: Team[] = [];
  teams: Team[] = [];
  getTeams(){
    this.teams.splice(0);
    this.AllTeams.forEach((team, index) => {
      if(team.crn === this.courseService.currentCourse.crn) {
        this.teams.push(team);
      }
    });
  }

  constructor(private teamService:TeamService,private courseService:CourseService,private route:Router) { }

  ngOnInit(): void {
    this.AllTeams = this.teamService.teams;
    this.getTeams();
    this.teamService.getTeams
      .subscribe( teams => {
        this.AllTeams = teams;
        this.getTeams();
      });
  }

}
