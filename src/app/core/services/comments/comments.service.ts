import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient:HttpClient) { }

  creatComment(data:object):Observable<any>{
      return this.httpClient.post(environment.baseUrl+`/comments`,data);
  }

  getPostsComments(postId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/posts/${postId}/comments`);
  }

  updateComment(commentId:string,data:object):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/comments/${commentId}`,data);
  }

  deleteComment(commentId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/comments/${commentId}`);
  }

    
}
