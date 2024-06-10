import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontpageComponent } from './frontpage.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { UserService } from '../../service/userStorage/user.service';
import { HttpServiceService } from '../../service/http/http-service.service';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

describe('FrontpageComponent', () => {
  let component: FrontpageComponent;
  let fixture: ComponentFixture<FrontpageComponent>;
  let authServiceMock: any;
  let userServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    authServiceMock = {
      isLoggedIn$: of(false)
    };

    userServiceMock = {
      restoreUserSession: jasmine.createSpy('restoreUserSession')
    };

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: (key: string) => '3'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        RouterLink,
        FrontpageComponent
      ], 
      providers: [ 
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: HttpServiceService, useValue: {} }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(FrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
