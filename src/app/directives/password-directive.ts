import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { createPasswordStrengthValidator } from "../validator/validator";

@Directive({
    selector: "[passwordStrength]",
    providers: [{ provide: NG_VALIDATORS, useExisting: PasswordStrengthDirective, multi: true }]
})
export class PasswordStrengthDirective implements Validator {
    validate(control: AbstractControl<any, any>): ValidationErrors {
        return createPasswordStrengthValidator()(control);
    }
    /*registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }*/
    
}