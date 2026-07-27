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

tasks: any[] = [];

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
  loadTasks(): void {

  

  this.http.get<any[]>('https://studententry-api.onrender.com/api/tasks').subscribe({next: (res) => {
      console.log('Tasks:', res);

      this.tasks = res;

      this.totalTasks = this.tasks.length;

      this.pendingTasks = this.tasks.filter(
        t => t.status === 'Pending'
      ).length;

      this.completedTasks = this.tasks.filter(
        t => t.status === 'Completed'
      ).length;

      this.highPriorityTasks = this.tasks.filter(
        t => t.priority === 'High'
      ).length;

    },

    error: (err) => {

      console.log(err);

    }

  });

}
  get filteredTasks() {

  return this.tasks.filter(task =>
    task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
    task.subject.toLowerCase().includes(this.searchText.toLowerCase())
  );

}


  saveTask(): void {
    const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Create payload with student id
  const payload = {
    ...this.taskForm.value
  };

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();
      return;

    }

    console.log(this.taskForm.value);

    this.isLoading = true;
if (this.editIndex === null) {

    this.http.post(
      '${environment.apiBaseUrl}/api/tasks',payload ).subscribe({

  next: (res: any) => {

    console.log(res);

    this.loadTasks();

    this.taskForm.reset();

    this.isLoading = false;

    this.isSuccess = true;

  },

  error: (err) => {

    console.log(err);

    this.isLoading = false;

  },
  
    }
    
      )}

    else {

  const id = this.filteredTasks[this.editIndex]._id;

  this.http.put(
    `https://studententry-api.onrender.com/api/tasks/${id}`,
    payload
  ).subscribe({

    next: (res: any) => {

      this.loadTasks();
      this.editIndex = null;

      this.taskForm.reset();

      this.isLoading = false;

    },


      error: (err) => {

        console.log(err);

        this.isLoading = false;

      }

    });

    }
  
}
editTask(index: number): void {

  const task = this.filteredTasks[index];

  this.editIndex = index;

  this.taskForm.patchValue({

    title: task.title,
    description: task.description,
    subject: task.subject,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate?.substring(0, 10)

  });

}
deleteTask(index: number): void {

  const task = this.filteredTasks[index];

  this.http.delete(
    `https://studententry-api.onrender.com/api/tasks/${task._id}`
  ).subscribe({

    next: () => {

     this.loadTasks();
    },

    error: (err) => {

      console.log(err);

    }

  });

}
 clearForm(): void {

    this.taskForm.reset();

    this.editIndex = null;

  }
}