import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { Component , Input, OnInit, Inject} from '@angular/core';
import {DialogPanelComponent} from '../dialogdynamicPanel/dialogpanel.component';
import {BookService} from '../book.service';

@Component({
    selector: 'addPostDialog',
    templateUrl: './addPost.component.html',
    styleUrls: ['./addPost.component.css'],
  })
  export class AddPostDialog {
  
    meriClass = "bookStucBfrSlctd";
    bookStructAvail = true;
    constructor(
      public _bookService:BookService,
      public dialogRef: MdDialogRef<AddPostDialog>,
      @Inject(MD_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onOkClick(){
      this.onPostSlctd("dd");
    }

    onPostSlctd(event){
      console.log(event);
      this._bookService.createPost(event);
      // if(this.meriClass === "bookStucBfrSlctd"){
      //   this.meriClass="bookStucAfrSlctd";
      //   setTimeout(() =>{
      //     this.bookStructAvail = false;
      //   },800);
      //   return this.meriClass;
      // }
      // else{
      //   this.bookStructAvail = true;
      //   setTimeout(() =>{
      //   this.meriClass="bookStucBfrSlctd";
      //   return this.meriClass;
      //   },10);
        
        
      // }
    }
  }