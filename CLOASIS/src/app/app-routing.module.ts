import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { StudentsPageComponent } from './students-page/students-page.component';
import { CourseDetailPageComponent } from './courses-page/course-detail-page/course-detail-page.component';
import { CourseResolverService } from './services/course-resolver.service';
import { StudentListComponent } from './courses-page/course-detail-page/student-list/student-list.component';
import { AddStudentPageComponent } from './courses-page/course-detail-page/add-student-page/add-student-page.component';
import { EditStudentComponent } from './courses-page/course-detail-page/edit-student/edit-student.component';
import { CourseStatisticsPageComponent } from './courses-page/course-detail-page/course-statistics-page/course-statistics-page.component';
import { CourseCLOPageComponent } from './courses-page/course-detail-page/course-clo-page/course-clo-page.component';
import { TeamManagerPageComponent } from './courses-page/course-detail-page/team-manager-page/team-manager-page.component';
import { ExamsPageComponent } from './courses-page/course-detail-page/exams-page/exams-page.component';
import { AssignmentsPageComponent } from './courses-page/course-detail-page/assignments-page/assignments-page.component';
import { EditStudentTableComponent } from './students-page/student-table/edit-student-table/edit-student-table.component';
import { StudentTableComponent } from './students-page/student-table/student-table.component';
import { AddStudentComponent } from './students-page/add-student/add-student.component';


const routes: Routes = [
  {path:'HOMEPAGE', component: HomePageComponent},
  {path:'COURSESPAGE', component: CoursesPageComponent},
  {path: 'COURSEDETAILPAGE/:coursecode', component: CourseDetailPageComponent, resolve: {course: CourseResolverService},children: [
    {path:'', component: StudentListComponent},
    {path:'AddStudent', component: AddStudentPageComponent},
    {path:'EditStudent', component: EditStudentComponent},
    {path:'Statistics', component: CourseStatisticsPageComponent},
    {path:'CLO', component: CourseCLOPageComponent},
    {path:'TeamManager', component:TeamManagerPageComponent},
    {path:'Exams', component: ExamsPageComponent},
    {path:'Assignments', component: AssignmentsPageComponent}]},
  {path:'STUDENTSPAGE', component: StudentsPageComponent, children: [
    {path:'', component: StudentTableComponent},
    {path:'EditStudent', component: EditStudentTableComponent},
    {path:'AddStudent', component: AddStudentComponent}
  ]},
  {path: '**', redirectTo: 'HOMEPAGE'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
