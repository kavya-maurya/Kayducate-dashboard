import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

import { Tasks } from './tasks/tasks';

import { Courses } from './courses/courses';
import { Attendance } from './attendance/attendance';
import { Students } from './students/students';

const routes: Routes = [

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
  
    {
      path: 'dashboard',
      component: Dashboard
    },
  
    {
      path: 'students',
      component: Students
    },

    {
      path: 'tasks',
      component: Tasks
    },
    {
      path: 'courses',
      component: Courses
    },

    {
      path: 'attendance',
      component: Attendance
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,ReactiveFormsModule,FormsModule],
})
export class AdminRoutingModule {}
