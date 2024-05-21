import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontpageComponent } from './frontpage.component';
import { ActivatedRoute } from '@angular/router';

describe('FrontpageComponent', () => {
  let component: FrontpageComponent;
  let fixture: ComponentFixture<FrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontpageComponent], 
      providers: [ { provide: ActivatedRoute, useValue: {} } ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(FrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
