import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpServiceService } from '../service/http/http-service.service';
import { of } from 'rxjs';

class MatDialogRefMock {
  close(): void {}
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpService: HttpServiceService;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        BrowserAnimationsModule,
        MatDialogModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        { 
          provide: MatDialogRef, 
          useClass: MatDialogRefMock 
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpServiceService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.controls['firstName']).toBeDefined();
    expect(component.registerForm.controls['lastName']).toBeDefined();
    expect(component.registerForm.controls['email']).toBeDefined();
    expect(component.registerForm.controls['password']).toBeDefined();
    expect(component.registerForm.controls['age']).toBeDefined();
    expect(component.registerForm.controls['gender']).toBeDefined();
  });

  it('should show error message for empty first name', () => {
    const firstNameControl = component.registerForm.controls['firstName'];
    firstNameControl.setValue('');
    fixture.detectChanges();
    expect(firstNameControl.hasError('required')).toBeTruthy();
  });

  it('should show error message for short first name', () => {
    const firstNameControl = component.registerForm.controls['firstName'];
    firstNameControl.setValue('Jo');
    fixture.detectChanges();
    expect(firstNameControl.hasError('minlength')).toBeTruthy();
  });

  it('should show error message for empty last name', () => {
    const lastNameControl = component.registerForm.controls['lastName'];
    lastNameControl.setValue('');
    fixture.detectChanges();
    expect(lastNameControl.hasError('required')).toBeTruthy();
  });

  it('should show error message for empty email', () => {
    const emailControl = component.registerForm.controls['email'];
    emailControl.setValue('');
    fixture.detectChanges();
    expect(emailControl.hasError('required')).toBeTruthy();
  });

  it('should show error message for invalid email', () => {
    const emailControl = component.registerForm.controls['email'];
    emailControl.setValue('invalidemail');
    fixture.detectChanges();
    expect(emailControl.hasError('email')).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['email'].setValue('test@test.com');
    component.registerForm.controls['password'].setValue('123456');
    component.registerForm.controls['age'].setValue(30);
    component.registerForm.controls['gender'].setValue('Male');
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

  it('should register successfully and navigate to login', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const registerResponse = { message: 'Registration successful' };
    spyOn(httpService, 'postData').and.returnValue(of(registerResponse));

    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['email'].setValue('test@test.com');
    component.registerForm.controls['password'].setValue('123456');
    component.registerForm.controls['age'].setValue(30);
    component.registerForm.controls['gender'].setValue('Male');
    component.onSubmit();

    expect(httpService.postData).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
  
});
