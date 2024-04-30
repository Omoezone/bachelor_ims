import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserFrontComponent } from './user-front/user-front.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { CreateCollectionComponent } from './modals/create-collection/create-collection.component';
import { DetailCollectionComponent } from './detail-collection/detail-collection.component';
import { CreateItemComponent } from './modals/create-item/create-item.component';
import { LearnMoreComponent } from './information/learn-more/learn-more.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
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
    LoginComponent
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
