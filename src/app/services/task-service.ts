import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  label: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/all`);
  }

  getIncompleteTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/incomplete`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, completed: boolean): Observable<Task> {
    //console.log(`${this.apiUrl}/${id}/status?completed=${completed}`);
    const element = this.http.patch<Task>(`${this.apiUrl}/${id}/status?completed=${completed}`, {});
    //element.subscribe((res) => { console.log(res) })
    return element;
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/add`, task);
  }
}
