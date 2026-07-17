import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})

  export class Register implements OnInit {

  registerForm!: FormGroup;
  fb: any;

  constructor(private http: HttpClient){
        
      }


  ngOnInit(): void {

    this.registerForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }

  onSubmit(): void {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();
      return;

    }

    console.log("Registration Successful!");

    console.log(this.registerForm.value);

    // Future API Call
    // this.http.post('YOUR_API_URL', this.registerForm.value).subscribe(res => {
    //   console.log(res);
    // });

    this.registerForm.reset();

  }

}


