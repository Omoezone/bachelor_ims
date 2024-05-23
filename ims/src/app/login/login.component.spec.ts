import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpServiceService } from '../service/http/http-service.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpService: HttpServiceService;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        LoginComponent
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpServiceService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('should show error message for empty email', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('');
    fixture.detectChanges();
    expect(emailControl.hasError('required')).toBeTruthy();
  });

  it('should show error message for invalid email', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('invalidemail');
    fixture.detectChanges();
    expect(emailControl.hasError('email')).toBeTruthy();
  });

  it('should show error message for empty password', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('');
    fixture.detectChanges();
    expect(passwordControl.hasError('required')).toBeTruthy();
  });

  it('should show error message for short password', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('123');
    fixture.detectChanges();
    expect(passwordControl.hasError('minlength')).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('123456');
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalsy();
  });
  
  it('should call onSubmit when form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should login successfully and navigate to userFrontPage', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const loginResponse = {
      token: 'fake-token',
      user: { id: 1, name: 'Test User' }
    };
    spyOn(httpService, 'login').and.returnValue(of(loginResponse));

    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('123456');
    component.onSubmit();

    expect(httpService.login).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/userFrontPage']);
  });
});
