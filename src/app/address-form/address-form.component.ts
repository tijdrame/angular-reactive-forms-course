import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder, FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators
} from '@angular/forms';
import { noop, Subscription } from 'rxjs';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true, useExisting: AddressFormComponent
    }
  ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {

  @Input()
  legend: string;
  onTouched = () => {};
  onChangeSub: Subscription;

  form: FormGroup = this.fb.group({
    addressLine1: [null, [Validators.required]],
    addressLine2: [null, [Validators.required]],
    zipCode: [null, [Validators.required]],
    city: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder) {
  }
  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }
  //ts les champs sont obligatoires
  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value);
    }
  }
  registerOnChange(onChange: any): void {
    //mm chose pour les 2 lignes ci dessous
    ///this.form.valueChanges.subscribe(value => onChange(value));
    this.onChangeSub = this.form.valueChanges.subscribe(onChange);
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched
  }
  setDisabledState?(disabled: boolean): void {
    if(disabled){
      this.form.disable();
    }else {
      this.form.enable();
    }
  }

}



