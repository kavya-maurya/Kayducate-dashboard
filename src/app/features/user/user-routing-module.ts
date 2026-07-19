import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard';
import { Profile} from './profile/profile';
import { Courses } from './courses/courses';
import { Attendance } from './attendance/attendance';
import { Task } from './task/task';



const routes: Routes = [

  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },

  {
    path: 'dashboard',
    component: DashboardComponent
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
    path: 'task',
    component:Task
   }


 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
