import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.html',
  styleUrl: './task.css',
})


export class Task implements OnInit {

  taskForm!: FormGroup;

  isLoading = false;
  isSuccess = false;
  totalTasks = 0;
pendingTasks = 0;
completedTasks = 0;
highPriorityTasks = 0;
searchText: string = '';

  editIndex: number | null = null;

filteredTasks: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.taskForm = this.fb.group({

      title: [
        '',
        Validators.required
      ],

      description: [
        '',
        Validators.required
      ],

      subject: [
        '',
        Validators.required
      ],

      priority: [
        '',
        Validators.required
      ],

      status: [
        '',
        Validators.required
      ],

      dueDate: [
        '',
        Validators.required
      ]
      

    });

  }

  saveTask(): void {
    const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Create payload with student id
  const payload = {
    ...this.taskForm.value,
    student: user?.user?._id
  };

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();
      return;

    }

    console.log(this.taskForm.value);

    this.isLoading = true;

    this.http.post(
      'https://studententry-api.onrender.com/api/tasks',payload ).subscribe({next: (res) => {

        console.log(res);

        this.taskForm.reset();

        this.isLoading = false;
        this.isSuccess = true;

      },

      error: (err) => {

        console.log(err);

        this.isLoading = false;

      }

    });

  }

  clearForm(): void {

    this.taskForm.reset();

  }
  editTask(index: number) {

}
deleteTask(index: number) {

}
}
