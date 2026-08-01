import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { Profile } from './profile/profile';
import { Courses } from './courses/courses';
import { Attendance } from './attendance/attendance';
import { Task } from './task/task';
import { AuthGuard } from '../../guards/auth-guard-guard';
import { SingleTask } from './single-task/single-task';
import { SyllabusComponent } from '../user/syllabus/syllabus';



const routes: Routes = [

  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'profile',
    component: Profile
  },

  {
    path: 'courses',
    component: Courses
  },

  {
    path: 'attendance',
    component: Attendance
  },
  {
    path: 'syllabus',
    component: SyllabusComponent
  },
  {
    path: 'task',
    component: Task
  },

  {
    path: 'tasks/:id',
    component: SingleTask
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
