import { Component , Input} from '@angular/core';
import { loginService } from '../shared/authorization/login.service';  
import {Topic} from '../models/topic.model';
import {PanelComponent} from './dynamicPanel/panel.component';


@Component({
  selector: 'book-panel',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers : []
 })
export class BookComponent { 
  level = 1;
  constructor(){
  }

}
