import { Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list';
import { TaskDetailComponent } from './task-detail/task-detail';

export const routes: Routes = [
    { path: '', component: TasksListComponent },
    { path: 'task/:id', component: TaskDetailComponent }
];
