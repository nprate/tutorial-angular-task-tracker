import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../Task';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks:Task[] = [];

  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks():void{
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(task:Task):void{
     const index = this.tasks.indexOf(task);
     this.taskService.deleteTask(task).subscribe(
       () => 
        this.tasks.splice(index,1)
     );
  }

  toggleReminder(task:Task):void{
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
 }

 addTask(task:Task){
    console.log(task);
    this.taskService.addTask(task).subscribe(
      (t) => this.tasks.push(t)
    );
 }

 
}
