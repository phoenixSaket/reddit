import { Component } from '@angular/core';
import { Post } from './models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reddit';
  posts: Post[] = [];

  getPosts(posts: Post[]) {
    try {
      this.posts = posts;
    } catch (err: any) {
      console.log("AppComponent.getPosts cayght an error: ", err);
    }
  }
}
