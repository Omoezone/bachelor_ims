import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCollectionComponent } from './detail-collection.component';

describe('DetailCollectionComponent', () => {
  let component: DetailCollectionComponent;
  let fixture: ComponentFixture<DetailCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailCollectionComponent]
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
