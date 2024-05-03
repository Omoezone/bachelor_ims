import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { RegisterComponent } from './register/register.component';
import { UserFrontComponent } from './user-front/user-front.component';
import { DetailCollectionComponent } from './detail-collection/detail-collection.component';
import { LearnMoreComponent } from './information/learn-more/learn-more.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './service/authGuard/auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
    { path: '', redirectTo: '/frontpage', pathMatch: 'full' }, 
    { path: 'frontpage', component: FrontpageComponent }, 
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'learnMore', component: LearnMoreComponent },
    { path: 'userFrontPage', component: UserFrontComponent, canActivate: [AuthGuardService]},
    { path: 'details/:id', component: DetailCollectionComponent, canActivate: [AuthGuardService]},
    { path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
