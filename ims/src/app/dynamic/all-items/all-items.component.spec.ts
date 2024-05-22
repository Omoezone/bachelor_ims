import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllItemsComponent } from './all-items.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AllItemsComponent', () => {
  let component: AllItemsComponent;
  let fixture: ComponentFixture<AllItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AllItemsComponent,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
