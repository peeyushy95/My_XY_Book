export class Post {
    id : number;
    topic_id : number ;
    heading : string;
    data : string;
    links : any[];
    type : string;
    comments : string;

    constructor(heading : string, topic_id : number, data : string, links: any[],type : string , comments : string){
        this.heading = heading;
        this.topic_id = topic_id;
        this.data = data;
        this.links = links;
        this.type = type;
        this.comments = comments;
    }
}