export class Topic {
    userId : number;
    topicId : number ;
    desc : string;
    checked : boolean;

    constructor(userId : number, topicId : number, desc : string){
        this.desc = desc;
        this.topicId = topicId;
        this.userId = userId;
    }
}