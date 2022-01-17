import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

const httpOptions = {
   headers : new HttpHeaders({
     'Content-Type' : 'application/json'
   })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = `http://localhost:5000/tasks`;

  constructor(private httpClient : HttpClient ) { }

  getTasks() : Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiUrl);
   
  }

  deleteTask(task:Task) : Observable<void> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.httpClient.delete<void>(url);
  }

  updateTaskReminder(task:Task) : Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.httpClient.put<Task>(url,task,httpOptions);
  }

  addTask(task:Task) : Observable<Task> {
    const url = `${this.apiUrl}`;
    return this.httpClient.post<Task>(url,task,httpOptions);
  }
}
