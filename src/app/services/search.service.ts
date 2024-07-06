import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(keyword : string): Observable<any> {
    let url = `https://www.reddit.com/r/${keyword.replace(/ /gi,'+')}.json?sort=top&t=daily`;
    return this.http.get(url);
  }

  searchUsers(keyword : string): Observable<any> {
    let url = `https://www.reddit.com/user/${keyword.replace(/ /gi,'+')}.json`;
    return this.http.get(url); 
  }

 
}
