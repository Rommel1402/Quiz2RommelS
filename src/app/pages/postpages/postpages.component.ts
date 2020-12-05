import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ApiRequestService } from 'src/app/servicios/api-request.service';

@Component({
  selector: 'app-postpages',
  templateUrl: './postpages.component.html',
  styleUrls: ['./postpages.component.scss']
})
export class PostpagesComponent implements OnInit {

  posts:Array<Post>=[];
  constructor(private apiRequest: ApiRequestService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts():void{
    this.apiRequest.get_all_post().then(response=>{
      console.log('response',response);
      this.posts=response.data;
      
    }).catch(error=>{});
  
  }
}
