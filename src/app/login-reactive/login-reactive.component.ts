import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validator/validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  /*email = new FormControl('', {
    validators: [Validators.required, Validators.email],
    updateOn: 'blur'//qd le composant n'aura plus le focus
  });
  password = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6),
  createPasswordStrengthValidator()]
})**/
  form = this.fb.group({
    email: ['n', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    password: ['2', [Validators.required, Validators.minLength(6),
    createPasswordStrengthValidator()]]
  });

  constructor(private fb: NonNullableFormBuilder) { }

  ngOnInit() {

  }

  reset(){
    this.form.reset();
    console.log(this.form.value)
  }

  get email(){
    return this.form.controls['email'];
  }

  get password(){
    return this.form.controls['password'];
  }

}
