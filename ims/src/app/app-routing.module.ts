import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    { path: '', redirectTo: '/frontpage', pathMatch: 'full' }, 
    { path: 'frontpage', component: FrontpageComponent }, 
    { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
