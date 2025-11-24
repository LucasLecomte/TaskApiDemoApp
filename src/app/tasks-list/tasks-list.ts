import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Task, TaskService } from '../services/task-service';
import { AddStepDialogComponent } from '../add-step-dialog/add-step-dialog';
import { Observable } from 'rxjs';
import { TaskFilterPipe } from '../pipes/task-filter.pipe';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatDialogModule,
    TaskFilterPipe,
  ],
  templateUrl: 'tasks-list.html',
  styleUrl: 'tasks-list.css'
})
export class TasksListComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  filter = 'all';

  constructor(private taskService: TaskService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updateTaskList();
  }

  updateTaskList() {
    this.tasks$ = this.taskService.getAllTasks();
  }

  toggleStatus(task: Task) {
    // The task list is refreshed after de task's status is updated
    this.taskService.updateStatus(task.id, !task.completed).subscribe(() => { this.updateTaskList() });
  }

  openAddStepDialog() {
    const dialogRef = this.dialog.open(AddStepDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // id is set to a random number then the API sets it to the correct id number
        // By design the task is considered to be incomplete on creation
        const task = {
          id: 0,
          label: result.label,
          description: result.description,
          completed: false
        };

        this.taskService.addTask(task).subscribe(() => {
          this.updateTaskList();
        });
      }
    });
  }
}
