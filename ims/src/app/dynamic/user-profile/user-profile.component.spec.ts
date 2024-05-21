import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/userStorage/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { last } from 'rxjs';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  // Mock UserService
  const mockUser = {
    firstName: 'John', 
    lastName: 'Doe', 
    userId: 1, 
    groups: ['group1', 'group2']

  };
  const userServiceMock = jasmine.createSpyObj('UserService', ['getUserId', 'getUser']);
  userServiceMock.getUser.and.returnValue(mockUser); 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        UserProfileComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        { provide: UserService, useValue: userServiceMock } // Provide the mock UserService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
