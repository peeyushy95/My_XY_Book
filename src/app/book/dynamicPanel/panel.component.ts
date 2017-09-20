import { Component , Input} from '@angular/core';


@Component({
  selector: 'dyn-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  providers : []
 })
export class PanelComponent { 
  
  @Input() level;

  constructor(){
    if(!this.level) this.level =4;
    console.log("ddd" + this.level);
  }

}
