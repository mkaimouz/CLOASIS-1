import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from './course.service';

interface course {crn: string;
    name: string;
    coursecode: string;
    room: string;
    professor: string;
    profEmail: string;
    profOffice: string;
    description: string;
    credits: number;
    progress: number;
    sectionNum: number;
    semester: string;}

@Injectable()
export class CourseResolverService implements Resolve<course>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<course> | Promise<course> | course {
    this.courseService.currentCourseCode = route.params['coursecode'];
    return this.courseService.getCourseCRN(route.params['coursecode']);
  }
  constructor(private courseService: CourseService) { }
}
