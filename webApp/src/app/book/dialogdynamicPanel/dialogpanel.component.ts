import { Component , Input, ViewChild, ElementRef, Renderer2, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {Post} from '../../models/post.models';

@Component({
  selector: 'dialog-dyn-panel',
  templateUrl: './dialogpanel.component.html',
  styleUrls: ['./dialogpanel.component.css'],
  providers : []
 })
export class DialogPanelComponent  implements AfterViewInit  { 
  

  @Input() data;
  expandedHeight : string = "35px";
  @ViewChild('someVar') panelHeader: ElementRef;

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor( private renderer: Renderer2, private elementRef: ElementRef){
      //console.log("vdfd" + this.data);
  }

  ngAfterViewInit() {
  }
  
  myfunct(comment,parentMap){
    console.log(comment,parentMap);
    this.notify.emit({'comment':comment , 'map' :parentMap});
  }

  tempNotifier(event){
    this.notify.emit(event);
  }

}
