import {ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import { UserService } from '../services/user.service';
import {Observable} from 'rxjs';

export class CustomValidator {
  static onlyLetters(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const name = /([a-zA-Z])/.test(control.value);
      return name ? {onlyLetters: {value: control.value}} : null;
    };
  }
  static emailExists(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors> | null => {
      return new Promise((resolve, reject) => {
        if (! control.value) {
          resolve(null);
        }
        userService.checkIfEmailExists(control.value).subscribe(response => {
          resolve(null);
        }, errors => {
          if (errors.status === 409) {
            resolve ({"userExists" : true});
          } else if (errors.status === 204) {
            resolve (null);
          }
        });
      });
    };
  }

}
