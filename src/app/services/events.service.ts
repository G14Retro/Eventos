import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { eventoModel } from '../models/evento.model';
import { userModel } from '../models/user.model';
import { map } from "rxjs/operators";
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  userLocal:userModel= new userModel;
  url:string = 'http://186.31.162.177:5000/api/';
  constructor(private http:HttpClient) {
    this.sessionRead();
   }

  signup(user:userModel){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data  ={
      ...user
    };
   return this.http.post(this.url + 'auth/signup',data,{headers});
  }

  login(user:userModel){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data  ={
      ...user
    };
    console.log(data);
    return this.http.post(this.url + 'auth/login',data,{headers})
    .pipe(map((resp:any)=>{
      this.sessionSave(resp['token']['access_token']),
      ((err:any)=> console.log(err))
    }));
  }

  logout(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.userLocal.token
    });
    return this.http.delete(this.url + 'auth/logout',{headers});
  }
  saveEvent(event:eventoModel){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.userLocal.token
    });
    const data = {
      ...event
    };
    return this.http.post(this.url+'events',data,{headers})
  }
  editEvent(event:eventoModel){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.userLocal.token
    });
    const data = {
      ...event
    };
    return this.http.put(this.url+'events/'+event.id,data,{headers});
  }

  removeEvent(id:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.userLocal.token
    });
    return this.http.delete(this.url+ 'events/' + id,{headers});
  }

  getEvents(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.userLocal.token
    });
    return this.http.get(this.url + 'events',{headers})
  }

  findEvent(id:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.userLocal.token
    });
    return this.http.get(this.url + 'events/'+id,{headers});
  }
  sessionSave(token:string){

    this.userLocal.token = token;
    sessionStorage.setItem('data',JSON.stringify(this.userLocal.token));
  }
  sessionRead(){
    if (sessionStorage.getItem('data')) {
      this.userLocal.token = JSON.parse(sessionStorage.getItem('data'))
      }
      else{
        this.userLocal = new userModel;
      }
  }
  sessionErase(){
    sessionStorage.removeItem('data');
  }

  public accessLog():Boolean{
    if (sessionStorage.getItem('data')==null) {
      return true
    } else {
      return false
    }
  }
}
