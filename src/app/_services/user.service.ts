import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import {User} from "../_models/user";
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {
  userModel_Response: any;
  api_uri = environment.BASE_URL + '/api';

  constructor(
    private http: HttpClient,
  ) { }

  getUsers() {
    const uri = this.api_uri + '/' + environment.API_ENDPOINT.employees;
    return this.http.get(uri).map(res => {return res;});
  }  

  addUser(user: User):Observable<User>{
    const uri = this.api_uri + '/' + environment.API_ENDPOINT.addEmployee;
    return this.http.post<User>(uri,user)//.map(res => {console.log(res);return res;});    
  }


}
