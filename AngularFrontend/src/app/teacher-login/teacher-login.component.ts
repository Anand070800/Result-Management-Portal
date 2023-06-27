
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultService } from '../result.service';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {

  teacherLogin = new FormGroup({
    name: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required)
  })

  error = false
  get name() { return this.teacherLogin.get('name') }
  get pass() { return this.teacherLogin.get('pass') }

  constructor(private result: ResultService, private router: Router) { }

  ngOnInit(): void {

  }
  r: any
  teacherlogin() {
    this.result.getTeacher(this.teacherLogin.value).subscribe((result) => {
      console.warn(result)
      this.r = result

      if (this.r["message"] == "valid") {
        localStorage.setItem("logged", "true")
        this.router.navigate(['/teacher-view']);
      }
      else
        this.error = true
    })
  }
}

//   }
//  // creation
//   teacherlogin() {
//     this.http.get<any>("http://localhost:3000/teacher-signup").subscribe(res => {
//       //match email and password
//       const teacher = res.find((a: any) => {
//         return a.email === this.teacherloginform.value.email && a.password === this.teacherloginform.value.password
//       })

//       //condition for login
//       if(teacher) {
//         alert("Successfully Logged In");
//         this.teacherloginform.reset();
//         this.router.navigate(['teacher-view']);
//       } else {
//         alert("Teacher not found!!");
//       }
//     }, err => {
//       alert("Something went Wrong!!");
//     })
//   }
// }