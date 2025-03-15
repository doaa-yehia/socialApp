import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { IUser } from '../../../shared/interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient) { }

  userData:WritableSignal<IUser>=signal({} as IUser);

  getSingUp(form:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/users/signup`,form)
  }

  getSingIn(form:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/users/signin`,form);
  }

  getChangePassword(form:object):Observable<any>{
    return this.httpClient.patch(environment.baseUrl+`/users/change-password`,form);
  }

  getuserData():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/users/profile-data`);
  }

  updateProfilePhoto(photo:object):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/users/upload-photo`,photo)
  }
  

}
