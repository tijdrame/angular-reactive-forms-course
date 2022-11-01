import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  val = {
    email: "hello@gmail.com",
    password: '123456'
  }

  constructor() {


  }

  ngOnInit() {

  }

  login(loginForm: NgForm, event){
    console.log(loginForm.value, loginForm.valid)
  }

  onEmailChanged(event){
    console.log('change ='+event)
  }

}
