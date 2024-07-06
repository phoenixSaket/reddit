import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  OnChanges {

  @Input() posts: Post[] = [];

  constructor() { }

  ngOnChanges(): void {
  }

}
