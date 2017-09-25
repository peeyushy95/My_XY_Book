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
    public allPost;
    public parentMap = [];
    public book = {show :true};
    constructor(private http: Http) {}       
   

    public getJSON(userId, topicId): Observable<any> {
        return this.http.get("assets/file.json")
                        .map((res:any) => res.json())
                        .catch((error:any) => Observable.throw(error.message || 'Server error'));
    }

    createPost(topicPayload): Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.prefixURL +'/createPost',topicPayload,{ headers: headers})
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.message || 'Server error'));
    }

    public updateTopicMapInDB(bookMap){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.http.post(this.prefixURL +'/updateTopicMap',bookMap,{ headers: headers})
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.message || 'Server error'))
                        .subscribe({ error: e => console.error(e) });;
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
                    this.allPost = res.json();
                    this.createBookData(this.allPost);
                    resolve(this.bookData);
                }
              );
          });
          return promise;
    }

    public getTopicMap(userId,topicId){
        this.bookMap = null;
        this.postDict = {};
        this.bookData = null;
        let promise = new Promise((resolve, reject) => {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let params = new HttpParams();
            params = params.append("userId", userId);
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

    public createBookData(json_data){
        this.postDict = {};
        json_data.forEach(e => {
            this.postDict[e.postId] = e;
        });

        this.bookData = {};
        this.headingMap = {}
        this.parentMap = [];
        if(this.bookMap.mapDetails){
            this.mapTheData(this.bookMap.mapDetails.data, this.bookData,this.parentMap)
            console.log(this.bookMap.data);
        }
    }

    public mapTheData(parent, bookData, parentMap){
        parent.forEach(e => {
            parentMap.push(e.id);
            this.pushInBookData(e,bookData,parentMap)
            if(e.child){
                bookData.PanelData[bookData.PanelData.length - 1].child = {};
                this.mapTheData(e.child, bookData.PanelData[bookData.PanelData.length - 1].child, parentMap);
            }
            parentMap.pop();
        });
    }

    public pushInBookData(data, bookData, parentMap){
        if(!bookData.PanelData) bookData.PanelData = [];
        this.postDict[data.id].parentMap  = Object.assign([], parentMap);
        bookData.PanelData.push(this.postDict[data.id]);
    }

    public updateMap(postPos, postId){
        this.insertInMap(this.bookMap.mapDetails.data,postPos.map,0, postPos.comment,postId);
        this.updateTopicMapInDB(this.bookMap);
    }

   

    public insertInMap(map, path,pathId,comment,postId){
        if(!path || (path.length) - pathId <= 1){
            var ind = -1;
            for(var i = 0; i < map.length; i++){
                if(map[i].id === path[pathId]){
                    ind = i;
                    break;
                }
            }
            //insert
            var mapField = {'id' : postId};
            if(comment === 'u'){
                if(!path){
                    map.push(mapField);
                }else{
                    map[ind].child = [mapField];
                }
            } else if(comment === 'a'){
                map.splice(ind+1,0, mapField);
            }else{
                map.splice(ind,0, mapField);
            }

            this.createBookData(this.allPost);
            return;
        }
        map.forEach(e => {
            if(e.id === path[pathId]){
                this.insertInMap(e.child, path,  pathId + 1,comment, postId);
            }
        });
        
    }
}