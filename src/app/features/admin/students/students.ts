import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
  
} from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students {

  studentForm: FormGroup;

  showModal = false;

  isEditMode = false;

  constructor(private fb: FormBuilder) {

    this.studentForm = this.fb.group({

      name: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],

      course: ['', Validators.required],

      semester: ['', Validators.required],

      rollNumber: ['', Validators.required],

      address: [''],

      status: ['Active', Validators.required]

    });

  }

  // ==========================
  // Open Modal
  // ==========================

  openModal() {

    this.showModal = true;

  }

  // ==========================
  // Close Modal
  // ==========================

  closeModal() {

    this.showModal = false;

    this.studentForm.reset({

      status: 'Active'

    });

    this.isEditMode = false;

  }

  // ==========================
  // Submit Form
  // ==========================

  saveStudent() {

    if (this.studentForm.invalid) {

      this.studentForm.markAllAsTouched();

      return;

    }

    console.log(this.studentForm.value);

    /*
      Backend API will come here

      POST /api/students

      or

      PUT /api/students/:id
    */

    this.closeModal();

  }

}