import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { Subscription } from 'rxjs'
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  text!:string;
  day!:string;
  reminder:boolean = false;

  showAddTask:boolean = false;
  subscription!: Subscription;

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  constructor(private uiService : UiService) { 

    this.subscription = this.uiService.onToggle().subscribe((value) => this.showAddTask = value);
  }

  ngOnInit(): void {

  }

  onSubmit(){

    if(!this.text){
      alert('Please add a task!');
    }

    const newTask:Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
