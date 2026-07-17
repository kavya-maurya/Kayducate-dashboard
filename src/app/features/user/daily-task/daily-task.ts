import { Component } from '@angular/core';
interface Task {
  title: string;
  description: string;
  subject: string;
  priority: string;
  status: string;
  dueDate: string;
}

@Component({
  selector: 'app-daily-task',
  standalone: false,
  templateUrl: './daily-task.html',
  styleUrl: './daily-task.css',
})
export class DailyTask {

  // Form Model
  task: Task = {
    title: '',
    description: '',
    subject: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: ''
  };

  // All Tasks
  tasks: Task[] = [];

  // Edit Mode
  editIndex: number | null = null;

  // Search
  searchText: string = '';

  // ============================
  // ADD / UPDATE TASK
  // ============================
  get filteredTasks(): Task[] {

  const search = this.searchText.toLowerCase().trim();

  if (!search) {

    return this.tasks;

  }

  return this.tasks.filter(task =>

      task.title.toLowerCase().includes(search)

      ||

      task.description.toLowerCase().includes(search)

      ||

      task.subject.toLowerCase().includes(search)

      ||

      task.priority.toLowerCase().includes(search)

      ||

      task.status.toLowerCase().includes(search)

  );

}

  saveTask() {

    if (
      this.task.title.trim() === '' ||
      this.task.description.trim() === ''
    ) {
      alert('Please fill all required fields.');
      return;
    }

    if (this.editIndex === null) {

      // Add New Task
      this.tasks.push({
        ...this.task
      });

    } else {

      // Update Existing Task
      this.tasks[this.editIndex] = {
        ...this.task
      };

      this.editIndex = null;

    }

    this.clearForm();

  }

  // ============================
  // EDIT
  // ============================

  editTask(index: number) {

    this.task = {
      ...this.tasks[index]
    };

    this.editIndex = index;

  }

  // ============================
  // DELETE
  // ============================

  deleteTask(index: number) {

    if (confirm('Delete this task?')) {

      this.tasks.splice(index, 1);

      if (this.editIndex === index) {

        this.clearForm();

      }

    }

  }

  // ============================
  // CLEAR
  // ============================

  clearForm() {

    this.task = {

      title: '',

      description: '',

      subject: '',

      priority: 'Medium',

      status: 'Pending',

      dueDate: ''

    };

    this.editIndex = null;

  }

  // ============================
  // SUMMARY
  // ============================

  get totalTasks(): number {

    return this.tasks.length;

  }

  get pendingTasks(): number {

    return this.tasks.filter(task =>
      task.status === 'Pending'
    ).length;

  }

  get completedTasks(): number {

    return this.tasks.filter(task =>
      task.status === 'Completed'
    ).length;

  }

  get highPriorityTasks(): number {

    return this.tasks.filter(task =>
      task.priority === 'High'
    ).length;

  }
}
