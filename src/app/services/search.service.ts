import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private previousPages: string[] = [];
  public changeInPreviousPages: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  search(keyword : string): Observable<any> {
    let url = `https://www.reddit.com/r/${keyword.replace(/ /gi,'+')}.json?sort=top&t=daily`;
    this.addToPreviousPages(keyword);
    return this.http.get(url);
  }

  searchUsers(keyword : string): Observable<any> {
    let url = `https://www.reddit.com/user/${keyword.replace(/ /gi,'+')}.json`;
    this.addToPreviousPages(keyword);
    return this.http.get(url); 
  }

  getPreviousPages(): string[] {
    let previousPages: string [] = [];
    try {
      previousPages = JSON.parse(localStorage.getItem("previousPages") || '[]');
    } catch (err: any) {
      console.log("SearchService.addToPreviousPages caught an error: ", err);    
    }
    return previousPages;
  }

  addToPreviousPages(keyword: string) {
    try {
      let previousPages = JSON.parse(localStorage.getItem("previousPages") || '[]');
      let isPresent = this.checkIfPresent(keyword);

      if (!isPresent) {
        previousPages.push(keyword);
      }

      localStorage.setItem("previousPages", JSON.stringify(previousPages));
      this.changeInPreviousPages.next(true);
    } catch (err: any) {
      console.log("SearchService.addToPreviousPages caught an error: ", err);
    }
  }

  removeFromPreviousPages(keyword: string) {
    try {
      let previousPages = JSON.parse(localStorage.getItem("previousPages") || '[]');
      let isPresent = this.checkIfPresent(keyword);
      let index = previousPages.indexOf(keyword);

      if (isPresent) {
        previousPages.splice(index, 1);
      }

      localStorage.setItem("previousPages", JSON.stringify(previousPages));
      this.changeInPreviousPages.next(true);
    } catch (err: any) {
      console.log("SearchService.removeFromPreviousPages caught an error: ", err);
    }
  }

  checkIfPresent(keyword: string): boolean {
    let ifPresent: boolean = false;
    try {
      let previousPages = JSON.parse(localStorage.getItem("previousPages") || '[]');
      let index = previousPages.indexOf(keyword);
      ifPresent = index != -1;
    } catch (err: any) {
      console.log("SearchService.checkIfPresent caught an error: ", err);
    }
    return ifPresent;
  }

 
}
