import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-selected-post',
  templateUrl: './selected-post.component.html',
  styleUrls: ['./selected-post.component.scss']
})
export class SelectedPostComponent implements OnInit {

  post:Post=null;
  constructor(

    private apiRequest:ApiRequestService, 
    private route: ActivatedRoute)
   { 
      this.route.paramMap.subscribe((params) => {
        console.log(params);
        const postid=params.get('postid');
        console.log(postid);
        this.getPost(parseInt(postid,10));
    })

  }
  ngOnInit(): void {
  }

  getPost(postId:number){
    this.apiRequest.getPost[postId].then(Response=>{
      this.post=Response.data;
    })
  }
}
