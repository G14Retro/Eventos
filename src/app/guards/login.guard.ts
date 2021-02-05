import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from '../services/events.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor (private event:EventsService, private route:Router){}
  canActivate(): boolean {
    if (this.event.accessLog()) {
      this.route.navigateByUrl('/login');
    } else {
          return true;
    }
  }
  
}
