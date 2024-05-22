import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailCollectionComponent } from './detail-collection.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HttpServiceService } from '../../service/http/http-service.service';

describe('DetailCollectionComponent', () => {
  let component: DetailCollectionComponent;
  let fixture: ComponentFixture<DetailCollectionComponent>;

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: () => '1'
      }
    }
  };

  // Mock HttpServiceService
  const httpServiceMock = jasmine.createSpyObj('HttpServiceService', ['getItemCollections']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DetailCollectionComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: HttpServiceService, useValue: httpServiceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCollectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
