import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { HttpServiceService } from '../service/http/http-service.service';
import { UserService } from '../service/userStorage/user.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-user-front',
  standalone: true,
  imports: [
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './user-front.component.html',
  styleUrl: './user-front.component.scss'
})
export class UserFrontComponent {
  displayedColumns: string[] = ['name', 'amountItems', 'actions'];
  dataSource!: any;;
  userId: any;
  constructor(
    private http: HttpServiceService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // Fetch collection data
    this.userId = this.userService.getUserId();
    console.log(this.userId);
    this.http.getUserCollections(`users/${this.userId}/collections`).subscribe({
      next: (data: any) => {
        this.dataSource = data
        console.log("data: ", data)
      },
      error: (error: any) => console.error('There was an error!', error)
    });
  }
  newCollection() {
    this.http.postCollection(`users/${this.userId}/collections`, {name: 'New Collection'}).subscribe({
      next: (data: any) => {
        console.log("data: ", data)
        this.dataSource.push(data)
      },
      error: (error: any) => console.error('There was an error!', error)
    });
  }

  viewDetails(element: any) {
    // Collection details
    console.log('View details for', element);
  }

  deleteElement(element: any) {
    // delete collection
    console.log('Delete', element);
  }
}

const data = [
  {name: 'Hydrogen', amountItems: 1079},
  // More data...
];