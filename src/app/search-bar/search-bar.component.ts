import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() posts: EventEmitter<Post[]> = new EventEmitter<Post[]>();
  searchKeyword: string = "";
  previousPages: string[] = [];
  showDropdown: boolean = false;

  constructor(private searchService: SearchService) { }
  
  ngOnInit(): void {
    this.previousPages = this.searchService.getPreviousPages();
    this.searchService.changeInPreviousPages.subscribe((isChanged: boolean) => {
      if (isChanged) {
        this.previousPages = this.searchService.getPreviousPages();
      }
    })
  }

  updatedKeyword(event: any) {
    if (event.key.toLowerCase() == "enter") {
      this.searchReddit();
      return;
    }

    this.searchKeyword = event.target.value;
  }

  searchReddit() {
    this.searchService.search(this.searchKeyword).subscribe((response: any) => {
      if(response.data.children.length > 0) {
        this.formatData(response);
      } else {
        this.searchService.searchUsers(this.searchKeyword).subscribe((res: any) => {
          this.formatData(res);
        });
      }
    }, error => {
      this.searchService.searchUsers(this.searchKeyword).subscribe((res: any) => {
        this.formatData(res);
      });
    })
  }

  formatData(res: any) {
    try {
      const data = res.data;
      const children = res.data.children
      const count = children.length;
      
      let posts: Post[] = []
      for (let i = 0; i < count; i++) {
        const allData = data.children[i].data;
        let date = parseInt(allData.created_utc.toString() + "000");
        const post: Post = {
          "title": allData.title,
          "image": allData.url,
          "link": 'https://www.reddit.com' + allData.permalink,
          "like": allData.ups,
          "dislike": allData.downs,
          "comment": allData.num_comments,
          "subredditName": allData.subreddit_name_prefixed,
          "author": allData.author,
          "dateCreated_UTC": new Date(date),
          "subreddit": allData.subreddit,
          "id": allData.id,
          "voteRatio": allData.upvote_ratio,
          "nsfw": allData.over_18
        };
        
        posts.push(post);
      }
  
      this.posts.emit(posts);
    } catch (err: any) {
      console.log("SearchBarComponent.formatData caught an error: ", err);
    }
  }

  onSelectionChange(selection: any) {
    if(!!selection) {
      console.log(selection);
      this.searchKeyword = selection;
      this.searchReddit();
    }

    this.toggleDropdown();
  }

  toggleDropdown() {
    this.showDropdown = !JSON.parse(JSON.stringify(this.showDropdown));
  }

  removeFromList(page: string) {
    this.searchService.removeFromPreviousPages(page);
  }


}
