import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllItemsComponent } from './all-items.component';
import { HttpClientModule } from '@angular/common/http';

describe('AllItemsComponent', () => {
  let component: AllItemsComponent;
  let fixture: ComponentFixture<AllItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AllItemsComponent,
        HttpClientModule
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
