import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../services/task-service';

@Pipe({
    name: 'taskFilter',
    standalone: true
})
export class TaskFilterPipe implements PipeTransform {

    transform(tasks: Task[] | null, filter: string): Task[] {
        if (!tasks) return [];

        switch (filter) {
            case 'completed':
                return tasks.filter(t => t.completed);
            case 'incomplete':
                return tasks.filter(t => !t.completed);
            default:
                return tasks;
        }
    }
}
