import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-single-task',
  standalone: false,
  templateUrl: './single-task.html',
  styleUrl: './single-task.css',
})
export class SingleTask implements OnInit {
  task: any = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Task could not be found.';
      return;
    }

    this.isLoading = true;
    this.http.get(`${environment.apiBaseUrl}/api/tasks/${id}`).subscribe({
      next: (res: any) => {
        this.task = res;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'We could not load this task right now.';
        this.isLoading = false;
      }
    });
  }
}
