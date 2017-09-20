import {Injectable} from '@angular/core'; 
import {Topic} from '../models/topic.model';
import {Router, Resolve,ActivatedRouteSnapshot} from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BookService {

prefixURL : any = 'http://localhost:8000';
   constructor(private http: Http) {}       
   

   public getJSON(userId, topicId): Observable<any> {
        return this.http.get("assets/file.json")
                        .map((res:any) => res.json())
                        .catch((error:any) => Observable.throw(error.message || 'Server error'));
    }
    
    public getTopicData(userId, topicId){

        let promise = new Promise((resolve, reject) => {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let params = new HttpParams();
            params = params.append("userId", userId);
            params = params.append("topicId", topicId);	
            this.http.get(this.prefixURL +'/topicData',{ headers: headers ,params: params})
              .toPromise()
              .then(
                (res) => { resolve(res.json());}
              );
          });
          return promise;
    }

    public getTopicMap(userId,topicId){
        let promise = new Promise((resolve, reject) => {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let params = new HttpParams();
            params = params.append("topicId", topicId);	

            this.http.get(this.prefixURL +'/getTopicMap',{ headers: headers ,params: params})
                            .toPromise()
                            .then(
                                (res) => { // Success
                                    this.getTopicData(userId,topicId)
                                    .then(
                                        res => {resolve(res);}
                                    );
                                  }
                            )
        });
        return promise;
    }
}