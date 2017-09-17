import { Component , OnInit} from '@angular/core';
import { loginService } from '../shared/authorization/login.service';  
import {TopicsService} from './topics.service'
import {Topic} from '../models/topic.model';



@Component({
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
  providers : [TopicsService]
 })
export class TopicComponent { 
  
  topicAvail : boolean = false;
  inputAvail : boolean = false;
  newTopic : any;
  topics : Topic[] = [];

  constructor(private _loginService : loginService , private _topicsService: TopicsService){
    _topicsService.getTopics(_loginService.user.id).subscribe(
        (response) => {
          this.topics = response;
          this.topicAvail = true;
        }, (error) =>  {
          console.log("Error while fetching topics");
        }
    );
  }

  createTopic(){
     if(this.inputAvail){
        let topic = new Topic(this._loginService.user.id,0,this.newTopic);
        this._topicsService.createTopic(topic).subscribe(
          (response) => {
            topic = response;
            //this.topics.push(topic);
            this.topics = this.topics.concat([topic]);
            this.newTopic = null;
          }, (error) =>  {
            console.log("Error while creating topic");
          }
        );    
     }
     this.inputAvail = !this.inputAvail;
  }

  deleteTopic(){
    let topicsToDelete = [];
    for (var i = this.topics.length - 1; i >= 0; i--) {
      if (this.topics[i].checked) {
        topicsToDelete.push(this.topics[i]);
        this.topics.splice(i, 1);
      }
    }
   
    this._topicsService.deleteTopics(topicsToDelete).subscribe(
      (response) => {
        console.log(response)
        //this.topics = response;
      }, (error) =>  {
        console.log("Error while deleting topics");
      }
    );    
  }

}
