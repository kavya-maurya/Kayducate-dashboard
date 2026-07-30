import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';

import { UserRoutingModule } from './user-routing-module';

import { Profile } from './profile/profile';
import { Courses } from './courses/courses';
import { Attendance } from './attendance/attendance';
import { DashboardComponent } from './dashboard/dashboard';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task } from './task/task';
import { SingleTask } from './single-task/single-task';


@NgModule({
  declarations: [Profile, Courses, Attendance,Task, SingleTask],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardComponent,
    UpperCasePipe
  
  ],
})
export class UserModule {}
