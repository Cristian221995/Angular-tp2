import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://utn2019-avanzada2-tp9.herokuapp.com/';

  constructor(private http: HttpClient) { }

  add(user: User): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json'
        }
      )};
    return this.http.post(this.url + 'sign-up' , user, httpOptions);
  }
  checkIfEmailExists(email): Promise<any> {
    return this.http.get('https://utn2019-avanzada2-tp9.herokuapp.com/users/identities?email=' + email).toPromise();
  }
}
