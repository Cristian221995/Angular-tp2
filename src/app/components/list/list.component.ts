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
  qProducts: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    const observable = this.productService.getAll(1);
    observable.subscribe( response => {
      console.log(response);
      this.productList = response.items;
      this.qProducts = response.total / 100;
    },
    error => {
      console.log(error);
    });
  }
  changePage(event) {
    this.productService.getAll(event - 1).subscribe((products) => {
      this.productList = products.items;
    });
  }
/*
  nextPage() {
    const observable = this.productService.getAll(true, false);
    observable.subscribe( response => {
        console.log(response);
        this.productList = response.items;
      },
      error => {
        console.log(error);
      });
  }
  previousPage() {
    const observable = this.productService.getAll(false, true);
    observable.subscribe( response => {
        console.log(response);
        this.productList = response.items;
      },
      error => {
        console.log(error);
      });
  }*/
}
