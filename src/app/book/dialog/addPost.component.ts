import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { Component , Input, OnInit, Inject} from '@angular/core';
import {DialogPanelComponent} from '../dialogdynamicPanel/dialogpanel.component';
@Component({
    selector: 'addPostDialog',
    templateUrl: './addPost.component.html',
    styleUrls: ['./addPost.component.css'],
  })
  export class AddPostDialog {
  
    constructor(
      public dialogRef: MdDialogRef<AddPostDialog>,
      @Inject(MD_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }