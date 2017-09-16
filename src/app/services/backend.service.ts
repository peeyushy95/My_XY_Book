import {Injectable} from '@angular/core'; 
import { Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs/Rx';
import {User} from '../models/user.model';

@Injectable()
export class BackendService{

    constructor (public http: Http) {}

    public loginUser(token): Observable<User>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params = new HttpParams();
        params = params.append("token", token);	

        return this.http.get('http://localhost:8000/login',{ headers: headers ,params: params})
         .map((res:Response) => res.json())
         .catch((error:any) => Observable.throw(error.message || 'Server error'));
    }

}