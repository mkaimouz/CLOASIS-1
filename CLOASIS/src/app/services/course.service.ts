import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Registration } from '../models/registration.model';
import { Student } from '../models/student.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Accept' : 'q=0.8;application/json;q=0.9'
  })
};

@Injectable()
export class CourseService {

  studentsEmitter = new Subject<Student[]>();
  selectedStudent = new Subject<Student>();
  coursesEmitter = new Subject<Course[]>();
  selectedCourse = new Subject<Course>();
  allStudentsEmiiter = new Subject<Student[]>();
  unregisteredStudents = new Subject<Student[]>();

  currentCourse: Course;
  currentCourseCode: string;
  currentStudent: Student;
  editField: string;
  editStudent_ID: string="";


  courses: Course[] = [
    {crn: "202020", name: "Intro to CMPS", coursecode: "CMPS 200", room: "Bliss 205", professor: "Ahmad Dhaini", progress: 50,profEmail:"",profOffice:"",description:"",credits:3,sectionNum:1,semester:""},
    {crn: "202021", name: "Intro to AI", coursecode: "CMPS 211", room: "Bliss 205", professor: "Ahmad Dhaini", progress: 50,profEmail:"",profOffice:"",description:"",credits:3,sectionNum:1,semester:""},
    {crn: "202022", name: "Intro to Data Science", coursecode: "CMPS 299", room: "Bliss 205", professor: "Ahmad Dhaini", progress: 50,profEmail:"",profOffice:"",description:"",credits:3,sectionNum:1,semester:""},
    {crn: "202023", name: "Intro to ML", coursecode: "CMPS 201", room: "Bliss 205", professor: "Ahmad Dhaini", progress: 50,profEmail:"",profOffice:"",description:"",credits:3,sectionNum:1,semester:""}
];

  registrations: Registration[] = [
  ];

  students: Student[] = [
    {studentid: "201904057",name: "Peter Yamout",email:"pky00@mail.aub.edu",teaM_ID: null,phone:"+961 71 000000",dob:"1999-01-01T00:00:00",gender:"M"},
    {studentid: "201904058",name: "Peter Yamoout",email:"pky00@mail.aub.edu",teaM_ID: null,phone:"+961 71 000000",dob:"1999-01-01T00:00:00",gender:"M"},
    {studentid: "201904059",name: "Peter Yamooout",email:"pky00@mail.aub.edu",teaM_ID: null,phone:"+961 71 000000",dob:"1999-01-01T00:00:00",gender:"M"},
    {studentid: "201904060",name: "Peter Yamoooout",email:"pky00@mail.aub.edu",teaM_ID: null,phone:"+961 71 000000",dob:"1999-01-01T00:00:00",gender:"M"},
    {studentid: "201904061",name: "Peter Yamooooout",email:"pky00@mail.aub.edu",teaM_ID: null,phone:"+961 71 000000",dob:"1999-01-01T00:00:00",gender:"M"},
    {studentid: "201904062",name: "Peter Yamouooooot",email:"pky00@mail.aub.edu",teaM_ID: null,phone:"+961 71 000000",dob:"1999-01-01T00:00:00",gender:"M"},
    {studentid: "201904063",name: "Peeter Yamout",email:"pky00@mail.aub.edu",teaM_ID: null,phone:"+961 71 000000",dob:"1999-01-01T00:00:00",gender:"M"},
    {studentid: "201904064",name: "Peeeter Yamout",email:"pky00@mail.aub.edu",teaM_ID: null,phone:"+961 71 000000",dob:"1999-01-01T00:00:00",gender:"M"},
    {studentid: "201904065",name: "Peeeeter Yamout",email:"pky00@mail.aub.edu",teaM_ID: null,phone:"+961 71 000000",dob:"1999-01-01T00:00:00",gender:"M"},
    {studentid: "201904066",name: "Peeeeeter Yamout",email:"pky00@mail.aub.edu",teaM_ID: null,phone:"+961 71 000000",dob:"1999-01-01T00:00:00",gender:"M"},
    {studentid: "201904067",name: "Peeeeeeeter Yamout",email:"pky00@mail.aub.edu",teaM_ID: null,phone:"+961 71 000000",dob:"1999-01-01T00:00:00",gender:"M"}
  ];

  getStudent(id:string, student:Student = {studentid: "",name: "",email:"",teaM_ID: "",phone:"",dob:"",gender:""}){
    this.http.get('https://cloasisapi.azurewebsites.net/Student/FetchStudent/'+id).subscribe( std => {
      student = {studentid: std[0]['studentid'],name: std[0]['name'],email:std[0]['email'],teaM_ID: std[0]['teaM_ID'],phone:std[0]['phone'],dob:std[0]['dob'],gender:std[0]['gender']};
      this.currentStudent = student;
      this.selectedStudent.next(student);
    });
    return student;
  }

  getNoOfStudents(crn:string,counter:number = 0){
    this.registrations.forEach(reg => {
      if(reg.crn === crn){
        counter++;
      }
    });
    return counter;
  }

  getCourseStudents(CRN: string,a: Student[] = []){
    this.http.get('https://cloasisapi.azurewebsites.net/Registration/GetStudentsInClass/'+ CRN,httpOptions).subscribe(
      reg => {
        for(let key in reg) {
          a.push({studentid:reg[key]["STUDENTID"] ,name:reg[key]["NAME"],email:"pky00@mail.aub.edu",teaM_ID: null,phone:"+961 71 000000",dob:"1999-01-01T00:00:00",gender:"M"});
        }
        this.studentsEmitter.next(a);
      }
    );
    
    return a;
  }

   getCourseCRN(a:string){
    //this.http.get('https://cloasisapi.azurewebsites.net/Class/FetchClass/214').subscribe( course => {
      //return course[0]["CRN"];
    //});
    return {crn:"N/A", name: "N/A", coursecode: "N/A", room: "N/A", professor: "N/A", progress: 50,profEmail:"",profOffice:"",description:"",credits:3,sectionNum:1,semester:""};
  }

  setCourse(courseCode:string, a: Course = {crn:"N/A", name: "N/A", coursecode: "N/A", room: "N/A", professor: "N/A", progress: 50,profEmail:"",profOffice:"",description:"",credits:3,sectionNum:1,semester:""}){
    this.http.get('https://cloasisapi.azurewebsites.net/Class/FetchClass/'+courseCode,httpOptions).toPromise().then( course => {
      a = {crn:course[0]["CRN"], name: course[0]["Course's Name"], coursecode: courseCode, room: course[0]["ROOM"], professor: course[0]["Professor's Name"], progress: course[0]["PROGRESS"],profEmail:course[0]["Professor's Email"],profOffice:course[0]["Professor's Office"],description:course[0]["Course's Description"],credits:course[0]["CREDITS"],sectionNum:course[0]["SECTION_NUM"],semester:course[0]["TEACHING_SEMESTER"]};
      this.currentCourse = a;
      this.selectedCourse.next(a);
    });
  }

  getCourse(courseCode: string, a: Course = {crn:"N/A", name: "N/A", coursecode: "N/A", room: "N/A", professor: "N/A", progress: 50,profEmail:"",profOffice:"",description:"",credits:3,sectionNum:1,semester:""}){
    this.http.get('https://cloasisapi.azurewebsites.net/Class/FetchClass/'+courseCode,httpOptions).toPromise().then( course => {
      a = {crn:course[0]["CRN"], name: "N/A", coursecode: "N/A", room: "N/A", professor: "N/A", progress: 50,profEmail:"",profOffice:"",description:"",credits:3,sectionNum:1,semester:""};
      this.currentCourse = a;
    });
    return a;
  }

  getALLCourses(){
    return this.http.get('https://cloasisapi.azurewebsites.net/Class/GetClasses',httpOptions);
  }

  addCourse(crn: string, name: string, coursecode: string,room: string,professor: string,progress: string){
    this.courses.push({crn:crn,name:name,coursecode:coursecode,room:room,professor:professor,progress:50,profEmail:"",profOffice:"",description:"",credits:3,sectionNum:1,semester:""});
  }

  enrollStudent(CRN:string,studentid:string){
    this.registrations.push({crn:"",courseName:"",coursecode:"",sectionNum:1,studentid:"",name:""});
  }

  editStudent(id: string,student: Student){
    this.http.put('https://cloasisapi.azurewebsites.net/Student/EditStudent/'+id,{"studentid":student.studentid,"name":student.name,"email":student.email,"phone":student.phone,"dob":student.dob,"gender":student.gender},httpOptions).subscribe();
  }

  addStudent(crn:string,studentid:string,teamID:string,name:string,email:string,phone:string,dob:string,gender:string){
    this.http.post<Student>('https://cloasisapi.azurewebsites.net/Student/CreateStudent',{"studentid":studentid,"teaM_ID":teamID,"name":name,"email":email,"phone":phone,"dob":dob,"gender":gender},httpOptions).subscribe();
  }



  removeStudent(id: string,a :string[]=[], b: number = 0){
    this.http.get('https://cloasisapi.azurewebsites.net/Registration/GetClassesOfStudent/'+id,httpOptions).subscribe( reg => {
      for(let key in reg){
        a.push(reg[key]["CRN"]);
        b++;
      }
    });
    if (b > 0 ){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "data":a
      },
    };
    
    this.http
      .delete('https://cloasisapi.azurewebsites.net/Registration/DropStudent/'+id, options)
      .subscribe();}
    this.http.delete('https://cloasisapi.azurewebsites.net/Student/DeleteStudent/'+id,httpOptions).subscribe();
    this.getStudents();
  }

  editCourse(crn: string, course: Course){
    //this.http.put()
  }

  getUnregStudents(cr:string,a:Student[]=[]){
    this.http.get('https://cloasisapi.azurewebsites.net/Registration/GetStudentsNotInClass/'+cr,httpOptions).subscribe(
      stds => {
        for(let key in stds){
          a.push({studentid: stds[key]['STUDENTID'],name: stds[key]['NAME'],email:stds[key]['email'],teaM_ID: stds[key]['teaM_ID'],phone:stds[key]['phone'],dob:stds[key]['dob'],gender:stds[key]['gender']});
        }
        this.unregisteredStudents.next(a);
      }
    );
  }

  registerStudent(id:string, crn:string){
    console.log(crn);
    this.http.post<Student>('https://cloasisapi.azurewebsites.net/Registration/RegisterStudent/'+id,{"data":[crn]},httpOptions).subscribe( a => {
      this.getUnregStudents(crn);
    });
    
  }

  unregisterStudent(id: string,crn: string){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "data":[crn]
      },
    };
    
    this.http
      .delete('https://cloasisapi.azurewebsites.net/Registration/DropStudent/'+id, options)
      .subscribe( a => {
        this.getCourseStudents(crn);
      });
  }

  getCourses(a:Course[]=[]){
    this.http.get('https://cloasisapi.azurewebsites.net/Class/GetClasses',httpOptions).subscribe(
      reg => {
        for(let key in reg) {
          a.push({crn:reg[key]["CRN"], name: reg[key]["Course's Name"], coursecode: reg[key]["Course's Code"], room: reg[key]["ROOM"], professor: reg[key]["Professor's Name"], 
            progress: reg[key]["PROGRESS"],profEmail:reg[key]["Professor's Email"],profOffice:reg[key]["Professor's Office"],description:reg[key]["Course's Description"],credits:reg[key]["CREDITS"],sectionNum:reg[key]["SECTION_NUM"],semester:reg[key]["TEACHING_SEMESTER"]});
        }
        this.coursesEmitter.next(a);
      }
    );
    
    return a;
  }

  getStudents(a: Student[] = []){
    this.http.get('https://cloasisapi.azurewebsites.net/Student/GetStudents',httpOptions).subscribe( std =>{
      for(let key in std) {
        a.push(std[key]);
      }
      this.allStudentsEmiiter.next(a);
    });
  }

  remove(crn: string) {
    this.courses.forEach((course,i:number)=>{
      if (course.crn===crn){
        this.courses.splice(i,1);
      }
    });
  }

  

  editcourse(crn:string,course: Course){
    this.courses.forEach((cor,i: number) => {
      if(cor.crn === crn) {
        this.courses[i] = course;
      }
    });
  }


  constructor(private http:HttpClient) { }
}
