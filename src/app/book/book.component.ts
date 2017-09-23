import { Component , Input, OnInit, Inject} from '@angular/core';
import { loginService } from '../shared/authorization/login.service';  
import {Topic} from '../models/topic.model';
import {PanelComponent} from './dynamicPanel/panel.component';
import {BookService} from './book.service';
import { ActivatedRoute } from '@angular/router';
import { AddPostDialog } from './dialog/addPost.component';

import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

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
  constructor(_bookService :BookService, private route: ActivatedRoute, public dialog: MdDialog){
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['bookData'];
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddPostDialog, {    
      width: '80%',
      height:'75%',
      //panelClass: 'my-full-screen-dialog', 
      data: {parentMap: null, PanelData : this.data.PanelData ? this.data.PanelData  : null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
