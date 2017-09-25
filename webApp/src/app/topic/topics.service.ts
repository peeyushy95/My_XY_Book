import {Injectable} from '@angular/core'; 
import {Topic} from '../models/topic.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs/Rx';

@Injectable()
export class TopicsService{

    constructor(private http : Http){}
    prefixURL : any = 'http://localhost:8000';

    public getTopics(userId): Observable<Topic[]>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params = new HttpParams();
        params = params.append("userId", userId);	

        return this.http.get(this.prefixURL +'/topics',{ headers: headers ,params: params})
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.message || 'Server error'));
    }

    createTopic(topic): Observable<Topic>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.prefixURL +'/createTopic',topic,{ headers: headers})
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.message || 'Server error'));
    }

    deleteTopics(topics):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.prefixURL +'/deleteTopics',topics,{ headers: headers})
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.message || 'Server error'));
    }

}