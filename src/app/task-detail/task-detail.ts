import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskService } from '../services/task-service';
import { Observable, switchMap } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule],
  templateUrl: 'task-detail.html',
  styleUrl: 'task-detail.css'
})
export class TaskDetailComponent {
  task$!: Observable<Task>;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {
    this.task$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.taskService.getTaskById(Number(params.get('id')));
      })
    );
  }

  toggleStatus(task: Task) {
    this.task$ = this.taskService.updateStatus(task.id, !task.completed);
  }
}
