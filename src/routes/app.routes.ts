import { Routes } from "@angular/router";
import { EventComponent } from "src/app/components/event/event.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { LoginComponent } from "src/app/components/login/login.component";
import { RegisterComponent } from "src/app/components/register/register.component";
import { AccessGuard } from "src/app/guards/access.guard";
import { LoginGuard } from "src/app/guards/login.guard";


export const ROUTES:Routes = [
    // {path:'home',component: HomeComponent,canActivate:[AccessGuard]},
    {path: 'login', component:LoginComponent,canActivate:[AccessGuard]},
    {path: 'register',component:RegisterComponent,canActivate:[AccessGuard]},
    {path: 'event',component:EventComponent,canActivate:[LoginGuard]},
    {path: 'event/view/:id',component:EventComponent,canActivate:[LoginGuard]},
    {path: 'event/edit/:id',component:EventComponent,canActivate:[LoginGuard]},
    {path: 'home',component:HomeComponent,canActivate:[LoginGuard]},
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: '**', pathMatch: 'full', redirectTo: 'login'},
];