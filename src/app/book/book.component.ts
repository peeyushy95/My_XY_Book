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
  //providers : [BookService]
})

export class BookComponent implements OnInit{ 
  level = 10;
  contact;
  data :any;
  visible : any;
  constructor(private _bookService :BookService, private route: ActivatedRoute, 
    public dialog: MdDialog, 
   // public routeS: ActivatedRouteSnapshot
  ){
    this.visible = _bookService.book;
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['bookData'];
  }

  openDialog(): void {
    var self = this;
    let dialogRef = this.dialog.open(AddPostDialog, {    
      width: '80%',
      height:'75%',
      //panelClass: 'my-full-screen-dialog', 
      data: {parentMap: null, PanelData : this.data.PanelData ? this.data.PanelData  : null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.postPos);
      self._bookService.createPost({
                          topicId :this.route.snapshot.params.topicId, 
                          heading : result.heading, 
                          postData : result.postData })
                      .subscribe(
                        (res) =>{
                          self._bookService.allPost.push(res);
                          self._bookService.updateMap(result.postPos,res.postId);
                          self.data = self._bookService.bookData;
                          console.log("hello");
                        }
                      );
      console.log('The dialog was closed');
    });
  }
}
