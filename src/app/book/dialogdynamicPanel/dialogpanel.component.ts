import { Component , Input} from '@angular/core';


@Component({
  selector: 'dialog-dyn-panel',
  templateUrl: './dialogpanel.component.html',
  styleUrls: ['./dialogpanel.component.css'],
  providers : []
 })
export class DialogPanelComponent { 
  
  @Input() data;
  constructor(){
      //console.log("vdfd" + this.data);
  }

  openLink(link){
    window.open(link, "_blank");
  }
}
