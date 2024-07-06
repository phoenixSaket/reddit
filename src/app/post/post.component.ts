import { Component, Input, OnChanges } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnChanges {

  @Input() details: Post = {
    title: '',
    image: '',
    link: '',
    like: 0,
    dislike: 0,
    comment: 0,
    subredditName: '',
    author: '',
    dateCreated_UTC: new Date(),
    subreddit: '',
    id: '',
    voteRatio: 0,
    nsfw: false
  };

  shouldShowOutlet: boolean = false;

  constructor() { }

  ngOnChanges(): void {
  }

  toggleOutlet() {
    this.shouldShowOutlet = !this.shouldShowOutlet;
  }

  download(details: Post) {
    const link = document.createElement('a');
    link.href = details.image;
    link.download = details.title;
    link.click();
  }
}
