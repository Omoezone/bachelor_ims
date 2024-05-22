import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFrontComponent } from './user-front.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; 
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../../service/http/http-service.service';

describe('UserFrontComponent', () => {
  let component: UserFrontComponent;
  let fixture: ComponentFixture<UserFrontComponent>;
  let httpService: jasmine.SpyObj<HttpServiceService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('httpService', ['getUserCollections']);

    await TestBed.configureTestingModule({
      imports: [
        UserFrontComponent,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: httpService, 
          useValue: spy 

        },
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFrontComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpServiceService) as jasmine.SpyObj<HttpServiceService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
