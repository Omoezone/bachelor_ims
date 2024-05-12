import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationNotificationsComponent } from './invitation-notifications.component';

describe('InvitationNotificationsComponent', () => {
  let component: InvitationNotificationsComponent;
  let fixture: ComponentFixture<InvitationNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvitationNotificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvitationNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
