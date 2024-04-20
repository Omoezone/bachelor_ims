import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { FrontpageComponent } from './frontpage/frontpage.component';

export const routes: Routes = [
    { path: '', redirectTo: '/frontpage', pathMatch: 'full' }, 
    { path: 'frontpage', component: FrontpageComponent }, 
    { path: 'register', component: RegisterComponent },
];

