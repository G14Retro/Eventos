import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { userModel } from 'src/app/models/user.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  user:userModel= new userModel;
  confirm:Boolean = false;
  constructor(private event:EventsService, private route:Router) { }

  ngOnInit(): void {
    this.user = new userModel;
  }

  signup(form:NgForm){
    if (this.user.password != this.user.confirm) {
      this.confirm = true;
      return
    }else{
      this.confirm = false;
    }
    this.event.signup(this.user).subscribe(resp=>{
      this.route.navigateByUrl('/login');
    });
  }
}
