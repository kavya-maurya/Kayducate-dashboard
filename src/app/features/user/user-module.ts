import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing-module';

import { Profile } from './profile/profile';
import { Courses } from './courses/courses';
import { Attendance } from './attendance/attendance';
import { DashboardComponent } from './dashboard/dashboard';
import { DailyTask } from './daily-task/daily-task';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [Profile, Courses, Attendance, DailyTask],
  imports: [CommonModule, UserRoutingModule, DashboardComponent,FormsModule],
})
export class UserModule {}
