import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient:HttpClient) { }

  creatPosts(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/posts`,data);
  }

  getAllPosts():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/posts?page=87`);
  }

  getMyPosts():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/users/664bcf3e33da217c4af21f00/posts`);
  }

  getSinglePost(postId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/posts/${postId}`);
  }

  updatePost(data:object,postId:string):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/posts/${postId}`,data);
  }

  deletePost(postId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/posts/${postId}`);
  }


}
