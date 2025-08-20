import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientRequestService {

constructor(private httpClient:HttpClient) { }

  

  baseUrl='http://10.46.22.8:3000/persons'
  requestMethod<T>(method:"GET"|"POST"|"DELETE"|"PUT",url:string,body?:any) :Observable<T>{
    const URL = url ? `${this.baseUrl}/${url}` : this.baseUrl;
    switch(method){
      case "GET":return this.httpClient.get<T>(URL);
      case "POST":return this.httpClient.post<T>(this.baseUrl,body);
      case "DELETE":return this.httpClient.delete<T>(URL);
      case "PUT":return this.httpClient.put<T>(URL,body)
    }
  }
}
