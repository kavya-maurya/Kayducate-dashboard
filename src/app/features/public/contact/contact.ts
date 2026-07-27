import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  constructor(private http: HttpClient) {}

  onSubmit(contactForm: any) {
    if (contactForm.valid) {
      console.log(contactForm.value);

      this.http.post(`${environment.apiBaseUrl}/API/contact/contact`, contactForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          alert(res.status ?? 'Message sent successfully');
          contactForm.reset();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
