import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-attendance',
  standalone: false,
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})
export class Attendance {

  attendanceForm: FormGroup;

  showModal = false;

  attendance = [

    {
      student: 'Kavya Maurya',
      studentId: 'STU1024',
      course: 'Angular',
      date: '2026-07-22',
      status: 'Present',
      remarks: 'On Time'
    },

    {
      student: 'Rahul Sharma',
      studentId: 'STU1031',
      course: 'Java',
      date: '2026-07-22',
      status: 'Absent',
      remarks: 'Medical Leave'
    }

  ];

  constructor(private fb: FormBuilder) {

    this.attendanceForm = this.fb.group({

      student: ['', Validators.required],

      course: ['', Validators.required],

      date: ['', Validators.required],

      status: ['', Validators.required],

      remarks: ['']

    });

  }

  openModal(): void {

    this.showModal = true;

  }

  closeModal(): void {

    this.showModal = false;

    this.attendanceForm.reset();

  }

  saveAttendance(): void {

    if (this.attendanceForm.invalid) {

      this.attendanceForm.markAllAsTouched();

      return;

    }

    console.log(this.attendanceForm.value);

    this.attendance.push({

      student: this.attendanceForm.value.student,

      studentId: 'STU000',

      course: this.attendanceForm.value.course,

      date: this.attendanceForm.value.date,

      status: this.attendanceForm.value.status,

      remarks: this.attendanceForm.value.remarks

    });

    this.closeModal();

  }

  editAttendance(index: number): void {

    this.showModal = true;

    this.attendanceForm.patchValue({

      student: this.attendance[index].student,

      course: this.attendance[index].course,

      date: this.attendance[index].date,

      status: this.attendance[index].status,

      remarks: this.attendance[index].remarks

    });

  }

  deleteAttendance(index: number): void {

    this.attendance.splice(index, 1);

  }

}