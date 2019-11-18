import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'https://utn2019-avanzada2-tp9.herokuapp.com/api/products';
  auth = 'Bearer' + ' ' + localStorage.getItem('token');
  pag = 0;
  size = 10;

  constructor(private http: HttpClient) { }
  getAll(page): Observable<any> {
    this.pag = page ? this.pag + page : this.pag;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization: this.auth })
    };
    // @ts-ignore
    return  this.http.get(this.url + '/?direction=ASC&orderBy=productId&page=' + this.pag + '&size' + this.size, httpOptions);
  }
}
