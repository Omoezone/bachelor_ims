import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFrontComponent } from './user-front.component';
import { HttpClientModule } from '@angular/common/http'; 
import { ActivatedRoute } from '@angular/router';

describe('UserFrontComponent', () => {
  let component: UserFrontComponent;
  let fixture: ComponentFixture<UserFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserFrontComponent,
        HttpClientModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
