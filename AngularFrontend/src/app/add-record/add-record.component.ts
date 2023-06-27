import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  addRecord = new FormGroup({
    rollno: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    dob: new FormControl('', Validators.required),
    score: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),

  })

  error = false

  get rollno() { return this.addRecord.get('rollno') }
  get name() { return this.addRecord.get('name') }
  get dob() { return this.addRecord.get('dob') }
  get score() { return this.addRecord.get('score') }

  constructor(private router: ActivatedRoute, private result: ResultService, private routers: Router) { }

  r: any
  ngOnInit(): void {
    if (localStorage.getItem("logged") == "false") {
      this.routers.navigate(['/teacher-login']);
    }
  }
  add() {

    console.warn(this.addRecord.value)
    this.result.getAddRecord(this.addRecord.value).subscribe((result) => {
      console.log(result)
      this.r = result

      if (this.r["message"] == "Already exist") {
        this.error = true
        console.warn("Already exist")
      }
      else {
        this.routers.navigate(['/teacher-view']);
        console.warn("Added Successfully")
      }


    })

  }
  logout() {
    localStorage.setItem("logged", "false")
    this.routers.navigate(['/teacher-login']);
  }
}