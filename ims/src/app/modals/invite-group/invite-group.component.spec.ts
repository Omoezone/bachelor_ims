import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InviteGroupComponent } from './invite-group.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

class MatDialogRefMock {
  close(): void {}
}

describe('InviteGroupComponent', () => {
  let component: InviteGroupComponent;
  let fixture: ComponentFixture<InviteGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        BrowserAnimationsModule,
        InviteGroupComponent
      ],
      providers: [{ provide: MatDialogRef, useClass: MatDialogRefMock }] 
    }).compileComponents();
    
    fixture = TestBed.createComponent(InviteGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
