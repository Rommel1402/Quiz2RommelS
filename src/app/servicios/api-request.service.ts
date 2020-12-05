import { Injectable } from '@angular/core';
import Axios, { AxiosResponse } from 'axios';

import {Post} from '../models/post'

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  API_URL ='https://jsonplaceholder.typicode.com/posts';
  constructor() { }

  get_all_post(): Promise<AxiosResponse<Array<Post>>>{
    return   Axios.get(this.API_URL);
  }

  getPost(postId:number):Promise<AxiosResponse<Post>>{
    return Axios.get(`${this.API_URL}/${postId}`);

  }

}
