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
  isLoading=false;
  isSuccess=false;

  

  constructor(private fb: FormBuilder, private http:HttpClient) {}

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

    

   

    console.log(this.registerForm.value);

    this.isLoading=true;
    this.http.post('https://studententry-api.onrender.com/API/auth/register', this.registerForm.value).subscribe(res => {
      console.log(res);
      this.registerForm.reset();
      this.isLoading=false;
      this.isSuccess=true;
    });

    
    

  }

}


