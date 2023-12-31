import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultService } from '../result.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editRecord = new FormGroup({
    rollno: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    dob: new FormControl('', Validators.required),
    score: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),

  })
  constructor(private router: ActivatedRoute, private result: ResultService, private routers: Router) { }

  r: any
  ngOnInit(): void {
    if (localStorage.getItem("logged") == "false") {
      this.routers.navigate(['/teacher-login']);
    }
    console.warn(this.router.snapshot.params['rollno'])
    this.result.getresult(this.router.snapshot.params['rollno']).
      subscribe((result) => {
        this.r = result
        console.warn(this.r.data)
        this.editRecord = new FormGroup({
          rollno: new FormControl(this.r.data[0].rollno),
          name: new FormControl(this.r.data[0].name),
          dob: new FormControl(this.r.data[0].dob),
          score: new FormControl(this.r.data[0].score)
        })
      }
      )
  }
  edit() {
    this.result.getedit(this.editRecord.value).subscribe((result) => {
      console.log(result)
      this.routers.navigate(['/teacher-view']);
    })
  }
  logout() {
    localStorage.setItem("logged", "false")
    this.routers.navigate(['/teacher-login']);
  }
}

















//   editform!: FormGroup
//   constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
//   ngOnInit(): void {
//     this.editform = this.formBuilder.group({
//       rollno: ['', Validators.required],
//       name: ['', Validators.required],
//       dob: ['', Validators.required],
//       score: ['', Validators.required],
//     })
//   }
//   //creation
//   edit() {
//     this.http.post<any>("http://localhost:3000/student-signup", this.editform.value).subscribe(res => {
//       alert("Updated Successfully!!");
//       this.editform.reset();
//       this.router.navigate(['teacher-view'])
//     }, err => {
//       alert("Something Went Wrong!")
//     })
//   }
// }