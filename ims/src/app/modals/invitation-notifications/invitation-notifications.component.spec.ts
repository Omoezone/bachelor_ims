import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InvitationNotificationsComponent } from './invitation-notifications.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServiceService } from '../../service/http/http-service.service';
import { UserService } from '../../service/userStorage/user.service';
import { of } from 'rxjs';
import { MatListModule } from '@angular/material/list';

class MatDialogRefMock {
  close(): void {}
}

class HttpServiceServiceMock {
  acceptInvite() {
    return of({ groups: [] }); 
  }
  denyInvite() {
    return of({}); 
  }
}

class UserServiceMock {
  getUserId() {
    return '123'; 
  }
  setUserGroups(groups: any) {}
  removeInvite(invToken: string) {}
}

describe('InvitationNotificationsComponent', () => {
  let component: InvitationNotificationsComponent;
  let fixture: ComponentFixture<InvitationNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        InvitationNotificationsComponent,
        MatListModule // Make sure to import MatListModule if used in the component
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { notification: [] } }, // Ensure 'notification' is defined
        { provide: HttpServiceService, useClass: HttpServiceServiceMock },
        { provide: UserService, useClass: UserServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
