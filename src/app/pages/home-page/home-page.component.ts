import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/servicios/tasks.service';

import {Task} from '../../models/task';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private taskService: TasksService) { }

  task: Array<Task>=[];
  ngOnInit(): void {
  }

  getAllTask():void{
    this.taskService.getAllTasks().subscribe(items =>{
      console.log('items', items);
    })
  }
}
