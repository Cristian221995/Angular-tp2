import {ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors, AsyncValidator} from '@angular/forms';
import { UserService } from '../services/user.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CustomValidatorEmail implements AsyncValidator {
  constructor(private usersService: UserService) {}
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.usersService.checkIfEmailExists(control.value).pipe(
      map(() => null),
      catchError(err => {
        if (err.status === 409) {
          return of({
            emailExists: true
          });
        }
        console.error(err);
        return of(null);
      })
    );
  }
  /*static emailExists(userService: UserService): AsyncValidatorFn {
   return (control: AbstractControl): Promise<ValidationErrors> | null => {
     return new Promise((resolve, reject) => {
       if (! control.value) {
         resolve(null);
       }
       return userService.checkIfEmailExists(control.value).subscribe(response => {
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
 }*/
}
