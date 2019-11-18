import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'https://utn2019-avanzada2-tp9.herokuapp.com/api/products';
  auth = 'Bearer' + ' ' + localStorage.getItem('token');
  pag = 1;
  size = 10;
  method = 'productId';
  direction: string;

  constructor(private http: HttpClient) { }
  getAll(action: boolean, method: string, direction: boolean): Observable<any> {
    this.pag = method ? this.pag : (action ? this.pag += 1 : this.pag -= 1);
    this.method = method ? this.method = method : this.method;
    this.direction = direction ? 'ASC' : 'DESC';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.url + '/?direction=' + this.direction + '&orderBy=' + this.method + '&page=' + this.pag + '&size=' +
      this.size, httpOptions);
  }
}
