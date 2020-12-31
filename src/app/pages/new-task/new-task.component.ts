import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  listId: any;
  
  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
        
      }
    )
  }

  createTask(title: string){
    console.log("1233333");
    this.taskService.createTask(title,this.listId).subscribe((newTask: any) => {
      console.log(newTask);
      console.log("1233333");
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

}
