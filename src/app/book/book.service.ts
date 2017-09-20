import {Injectable} from '@angular/core'; 
import {Topic} from '../models/topic.model';
import {Router, Resolve,ActivatedRouteSnapshot} from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BookService {


   constructor(private http: Http) {}       
   

   public getJSON(userId, topicId): Observable<any> {
        return this.http.get("assets/file.json")
                        .map((res:any) => res.json())
                        .catch((error:any) => Observable.throw(error.message || 'Server error'));
    }
    

}