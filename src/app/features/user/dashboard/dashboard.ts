import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
 
})
export class DashboardComponent {

  cards = [
    {
      title: 'Courses',
      value: 6,
      icon: 'book'
    },
    {
      title: 'Attendance',
      value: '91%',
      icon: 'calendar'
    },
    {
      title: 'Assignments',
      value: 12,
      icon: 'file-text'
    },
    {
      title: 'CGPA',
      value: '8.7',
      icon: 'graduation-cap'
    }
  ];

}