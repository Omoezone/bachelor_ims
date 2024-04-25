import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { RegisterComponent } from './register/register.component';
import { UserFrontComponent } from './user-front/user-front.component';
import { DetailCollectionComponent } from './detail-collection/detail-collection.component';

const routes: Routes = [
    { path: '', redirectTo: '/frontpage', pathMatch: 'full' }, 
    { path: 'frontpage', component: FrontpageComponent }, 
    { path: 'register', component: RegisterComponent },
    { path: 'userFrontPage', component: UserFrontComponent },
    { path: 'details/:id', component: DetailCollectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
