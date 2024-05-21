import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCollectionComponent } from './detail-collection.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('DetailCollectionComponent', () => {
  let component: DetailCollectionComponent;
  let fixture: ComponentFixture<DetailCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DetailCollectionComponent,
        HttpClientModule ],
        providers: [
          { provide: ActivatedRoute, useValue: {} } 
        ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
