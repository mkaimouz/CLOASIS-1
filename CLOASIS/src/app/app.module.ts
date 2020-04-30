import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { StudentsPageComponent } from './students-page/students-page.component';
import { CourseDetailPageComponent } from './courses-page/course-detail-page/course-detail-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseService } from './services/course.service';
import { CourseResolverService } from './services/course-resolver.service';
import { StudentListComponent } from './courses-page/course-detail-page/student-list/student-list.component';
import { AddStudentPageComponent } from './courses-page/course-detail-page/add-student-page/add-student-page.component';
import { EditStudentComponent } from './courses-page/course-detail-page/edit-student/edit-student.component';
import { ChartsModule } from 'ng2-charts';
import { CourseStatisticsPageComponent } from './courses-page/course-detail-page/course-statistics-page/course-statistics-page.component';
import { CourseCLOPageComponent } from './courses-page/course-detail-page/course-clo-page/course-clo-page.component';
import { TeamManagerPageComponent } from './courses-page/course-detail-page/team-manager-page/team-manager-page.component';
import { ExamsPageComponent } from './courses-page/course-detail-page/exams-page/exams-page.component';
import { AssignmentsPageComponent } from './courses-page/course-detail-page/assignments-page/assignments-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StudentTableComponent } from './students-page/student-table/student-table.component';
import { EditStudentTableComponent } from './students-page/student-table/edit-student-table/edit-student-table.component';
import {HttpClientModule} from '@angular/common/http';
import { AddStudentComponent } from './students-page/add-student/add-student.component'


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CoursesPageComponent,
    StudentsPageComponent,
    CourseDetailPageComponent,
    SidebarComponent,
    NavbarComponent,
    StudentListComponent,
    AddStudentPageComponent,
    EditStudentComponent,
    CourseStatisticsPageComponent,
    CourseCLOPageComponent,
    TeamManagerPageComponent,
    ExamsPageComponent,
    AssignmentsPageComponent,
    StudentTableComponent,
    EditStudentTableComponent,
    AddStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [CourseService,CourseResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
