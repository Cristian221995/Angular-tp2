import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  productList = new Array<Product>();
  direction = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    const observable = this.productService.getAll(null, null, true);
    observable.subscribe( response => {
      console.log(response);
      this.productList = response.items;
    },
    error => {
      console.log(error);
    });
  }
  changePage(event) {
    this.productService.getAll(event, null, this.direction)
      .subscribe(next => {
        this.productList = next.items;
      });
  }
  order(method: string) {
    this.direction = this.direction === true ? false : true;
    this.productService.getAll(null, method, this.direction)
      .subscribe(next => {
        this.productList = next.items;
      });
  }
}
