import { Component , Input, OnInit} from '@angular/core';
import { loginService } from '../shared/authorization/login.service';  
import {Topic} from '../models/topic.model';
import {PanelComponent} from './dynamicPanel/panel.component';
import {BookService} from './book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'book-panel',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers : [BookService]
})

export class BookComponent implements OnInit{ 
  level = 10;
  contact;
  data :any;
  constructor(_bookService :BookService, private route: ActivatedRoute){
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['bookData'];
  }

}
