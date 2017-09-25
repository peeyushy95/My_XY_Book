import { Component , Input} from '@angular/core';


@Component({
  selector: 'dyn-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  providers : []
 })
export class PanelComponent { 
  
  @Input() data;
  constructor(){
      //console.log("vdfd" + this.data);
  }

  openLink(link){
    window.open(link, "_blank");
  }
}
