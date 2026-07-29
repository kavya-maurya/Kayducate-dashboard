import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-task',
  standalone: false,
  templateUrl: './single-task.html',
  styleUrl: './single-task.css',
})
export class SingleTask {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log(id);
  }
}
