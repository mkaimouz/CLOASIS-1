import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';
import { FormBuilder, FormGroup, Validators,FormArray,FormControl } from '@angular/forms';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent implements OnInit {
  courses: Course[];
  editcourse_crn: string="";
  @ViewChild('crn') crn: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('coursecode') coursecode: ElementRef;
  @ViewChild('professor') professor: ElementRef;
  @ViewChild('room') room: ElementRef;
  @ViewChild('progress') progress:ElementRef;
  constructor(private courseService: CourseService) { }
  controls: FormArray;


  ngOnInit(): void {
    this.courseService.getCourses();
    this.courseService.coursesEmitter.subscribe( crs => {
      this.courses = crs;
    });
  }

 

  
  remove(crn: string){
    this.courseService.remove(crn);
    this.courses=this.courseService.getCourses();
  }

  enableEditMethod(crn: string ) {
    this.editcourse_crn=crn;
  }

  disableEdit(){
    this.editcourse_crn="";
  }

  onSave(crn:string){
    this.courseService.editCourse(crn,{crn:this.crn.nativeElement.value,name:this.name.nativeElement.value,coursecode:this.coursecode.nativeElement.value,room:this.room.nativeElement.value,professor:this.professor.nativeElement.value,progress:this.progress.nativeElement.value,profEmail:"",profOffice:"",description:"",credits:3,sectionNum:1,semester:""})
    this.disableEdit();
    this.courses=this.courseService.getCourses();
  }

 


}
