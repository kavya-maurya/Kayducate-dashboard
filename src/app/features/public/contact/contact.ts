import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
   
      constructor(private http: HttpClient){
        
      }
   onSubmit(contactForm: any) {

    if(contactForm.valid) {
      //Post request to the server with the form data
     console.log(contactForm.value);
      
     this.http.post('https://kayducate-api.kaylynk.tech/API/contact/contact',contactForm.value).subscribe(res=>{
      console.log(res)
      alert(res["status"]);
      contactForm.reset();

    })
    }

    else{
      // send error message
    }
}
}
