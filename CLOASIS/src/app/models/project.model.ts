export class Project {
    project_ID:number;
    team: string;
    project_Title:string;
    project_Desc:string;

    constructor(project_ID:number,team: string,project_Title:string,project_Desc:string){

        project_ID = project_ID;
        team = team;
        project_Title = project_Title;
        project_Desc = project_Desc;

    }
}