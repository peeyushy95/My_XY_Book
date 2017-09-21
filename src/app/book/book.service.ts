import {Injectable} from '@angular/core'; 
import {Topic} from '../models/topic.model';
import {Router, Resolve,ActivatedRouteSnapshot} from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BookService {

    prefixURL : any = 'http://localhost:8000';
    
    public bookMap;
    public postDict = {};
    public bookData;
    public headingMap;

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
                (res) => { 
                    var data = res.json();
                    this.createBookData(data);
                    resolve(this.bookData);
                }
              );
          });
          return promise;
    }

    public createBookData(json_data){
        json_data.forEach(e => {
            this.postDict[e.postId] = e;
        });

        this.bookData = {};
        this.headingMap = {}
        var level = 1;
        if(this.bookMap.mapDetails){
            this.mapTheData(this.bookMap.mapDetails.data, this.bookData, level)
            console.log(this.bookMap.data);
        }
    }

    public mapTheData(parent, bookData, level){
        parent.forEach(e => {
            this.pushInBookData(e,bookData,level)
            if(e.child){
                bookData.PanelData[bookData.PanelData.length - 1].child = {};
                this.mapTheData(e.child, bookData.PanelData[bookData.PanelData.length - 1].child, level+1);
            }
        });
    }

    public pushInBookData(data, bookData, level){
        if(!bookData.level) bookData.level = level;
        if(!bookData.PanelData) bookData.PanelData = [];
        bookData.PanelData.push(this.postDict[data.id]);
    }

    public getTopicMap(userId,topicId){
        this.bookMap = null;
        this.postDict = {};
        this.bookData = null;
        let promise = new Promise((resolve, reject) => {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let params = new HttpParams();
            params = params.append("topicId", topicId);	

            this.http.get(this.prefixURL +'/getTopicMap',{ headers: headers ,params: params})
                            .toPromise()
                            .then(
                                (res) => { // Success
                                    this.bookMap = res.json();
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