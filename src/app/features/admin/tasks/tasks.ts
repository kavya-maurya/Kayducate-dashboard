import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {

  constructor(private fb: FormBuilder, private http: HttpClient) {

    this.taskForm = this.fb.group({

      title: ['', Validators.required],

      subject: ['', Validators.required],

      description: ['', Validators.required],

      priority: ['', Validators.required],

      status: ['', Validators.required],

      dueDate: ['', Validators.required],

    });

  }

  taskForm!: FormGroup;

  showTaskForm = false;

  searchText = '';

  statusFilter = '';

  priorityFilter = '';

  editIndex: number | null = null;

  tasks: any[] = [
    {
      title: 'Angular Assignment',
      subject: 'Angular',
      description: 'Complete CRUD Module',
      priority: 'High',
      status: 'Pending',
      dueDate: new Date(),
    },
    {
      title: 'DBMS Notes',
      subject: 'Database',
      description: 'Prepare Normalization Notes',
      priority: 'Medium',
      status: 'In Progress',
      dueDate: new Date(),
    },
  ];

  saveTask(): void {

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();

      return;

    }

    const taskPayload = this.taskForm.value;

    this.http.post(`${environment.apiBaseUrl}/API/tasks`, taskPayload).subscribe({
      next: (res) => {
        console.log(res);

        if (this.editIndex !== null) {
          this.tasks[this.editIndex] = taskPayload;
          this.editIndex = null;
        } else {
          this.tasks.push(taskPayload);
        }

        this.taskForm.reset();
        this.showTaskForm = false;
      },
      error: (err) => {
        console.error(err);
      },
    });

  }

  editTask(task: any): void {

    this.editIndex = this.tasks.indexOf(task);

    this.taskForm.patchValue(task);

    this.showTaskForm = true;

  }

  deleteTask(task: any): void {

    const index = this.tasks.indexOf(task);

    if (index > -1) {

      this.tasks.splice(index, 1);

    }

  }

  closeModal(): void {

    this.showTaskForm = false;

    this.editIndex = null;

    this.taskForm.reset();

  }

}