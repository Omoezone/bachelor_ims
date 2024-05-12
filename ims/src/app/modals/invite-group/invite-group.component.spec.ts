import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteGroupComponent } from './invite-group.component';

describe('InviteGroupComponent', () => {
  let component: InviteGroupComponent;
  let fixture: ComponentFixture<InviteGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InviteGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
