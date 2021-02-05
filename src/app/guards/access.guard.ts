import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from '../services/events.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor (private event:EventsService, private route:Router){}
  canActivate(): boolean {
    if (!this.event.accessLog()) {
      this.route.navigateByUrl('/home');
    } else {
          return true;
    }
  }
  
}
