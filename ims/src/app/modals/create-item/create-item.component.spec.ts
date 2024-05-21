import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemComponent } from './create-item.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InjectionToken } from '@angular/core';

const MAT_MDC_DIALOG_DATA = new InjectionToken<any>('MatMdcDialogData');

class MatDialogRefMock {
  close(): void {}
}

describe('CreateItemComponent', () => {
  let component: CreateItemComponent;
  let fixture: ComponentFixture<CreateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule], 
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_MDC_DIALOG_DATA, useValue: {} }
      ] 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
