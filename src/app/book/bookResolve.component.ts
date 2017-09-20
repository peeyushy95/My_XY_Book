import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BookService } from './book.service';

@Injectable()
export class BookResolve implements Resolve<any> {

  constructor(private _bookService: BookService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this._bookService.getJSON(route.paramMap.get('userId'),route.paramMap.get('topicId'));
  }
}