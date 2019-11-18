import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input()
  total: number;

  @Output()
  pageEvent: EventEmitter<number> = new EventEmitter();
  page: number;

  constructor() { }

  ngOnInit() {
  }
  changePage(page: number) {
    this.page = page;
    this.pageEvent.emit(this.page);
  }
}
