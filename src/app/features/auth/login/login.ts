import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isLoading=false;
  isSuccess=false;

  

  constructor(private fb: FormBuilder, private http:HttpClient) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
     
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(form: FormGroup) {
      this.isLoading=true;
     this.http.post('https://studententry-api.onrender.com/API/auth/login', this.loginForm.value).subscribe(res => {
      console.log(res);
      this.loginForm.reset();
       this.isLoading=false;
      this.isSuccess=true;
    });
  }

}
