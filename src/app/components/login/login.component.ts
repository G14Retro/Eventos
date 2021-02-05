import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { userModel } from 'src/app/models/user.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  user = new userModel;
  constructor(private event:EventsService, private route:Router) { }

  ngOnInit(): void {
    this.user = new userModel;
  }

  login(form:NgForm){
    if (form.invalid) {
      return
    }
    this.event.login(this.user).subscribe(resp=>{
      this.route.navigateByUrl('/home');
    },err=>{console.log(err)})
  }
}
