import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FrontpageComponent } from './layout/frontpage/frontpage.component';
import { UserFrontComponent } from './dynamic/user-front/user-front.component';
import { CreateCollectionComponent } from './modals/create-collection/create-collection.component';
import { DetailCollectionComponent } from './dynamic/detail-collection/detail-collection.component';
import { CreateItemComponent } from './modals/create-item/create-item.component';
import { LearnMoreComponent } from './information/learn-more/learn-more.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './dynamic/user-profile/user-profile.component';
import { AllItemsComponent } from './dynamic/all-items/all-items.component';
import { ConfirmationComponent } from './modals/confirmation/confirmation.component';
import { InviteGroupComponent } from './modals/invite-group/invite-group.component';
import { InvitationNotificationsComponent } from './modals/invitation-notifications/invitation-notifications.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmationComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    RegisterComponent,
    FooterComponent,
    FrontpageComponent, 
    UserFrontComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    CreateCollectionComponent,
    DetailCollectionComponent,
    CreateItemComponent,
    LearnMoreComponent,
    LoginComponent,
    UserProfileComponent,
    AllItemsComponent,
    InviteGroupComponent,
    InvitationNotificationsComponent
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
