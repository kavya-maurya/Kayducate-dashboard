import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { Students } from './students/students';
import { Courses } from './courses/courses';
import { Attendance } from './attendance/attendance';
import { Tasks } from './tasks/tasks';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [Dashboard, Students, Courses, Attendance, Tasks ],
  imports: [CommonModule, AdminRoutingModule,ReactiveFormsModule,FormsModule],
  providers: [
    DatePipe
  ]
})
export class AdminModule {}
