import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { noop, of } from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FileUploadComponent},
    { provide: NG_VALIDATORS, multi: true, useExisting: FileUploadComponent}
  ]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {

  onTouched = () => { };
  @Input() requiredFileType: string;
  fileName = '';
  fileUploadError = false;

  fileUploadSuccess = false;
  uploadProgress: number;
  disabled: boolean = false;

  onChange = (fileName: string) => { };

  onValidatorChange = () => { };
  constructor(private http: HttpClient) { }
  
  validate(control: AbstractControl<any, any>): ValidationErrors {
    if(this.fileUploadSuccess){
      return null;
    }
    let errors : any = {
      requiredFileType: this.requiredFileType
    };

    if(this.fileUploadError){
      errors.uploadFailed = true;
    }
    return errors;
  }
  registerOnValidatorChange?(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }

  writeValue(value: any) {
    //set juste le nom du fichier
    this.fileName = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  onClick(fileUpload: HTMLInputElement) {
    //dire qu'on a touché
    this.onTouched();
    //ouvrir la fenetre de dialog
    fileUpload.click();
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      this.fileUploadError = false;
      this.http.post("/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          catchError(error => {
            this.fileUploadError = true;
            return of(error);
          }),
          finalize(() => {
            this.uploadProgress = null;
          })
        )
        .subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
          else if (event.type == HttpEventType.Response) {
            //upload fini
            this.fileUploadSuccess = true;
            this.onChange(this.fileName);
            this.onValidatorChange();
          }
        });
    }
  }
}
