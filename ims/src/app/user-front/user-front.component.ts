import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { HttpServiceService } from '../service/http/http-service.service';
import { UserService } from '../service/userStorage/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CreateCollectionComponent } from '../create-collection/create-collection.component';
import { HttpParams } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-front',
  standalone: true,
  imports: [
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatDialogModule,
    RouterLink
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
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    console.log(this.userId);
    this.http.getUserCollections(`users/${this.userId}/collections`).subscribe({
      next: (data: any) => {
        this.dataSource = data
        console.log("data: ", this.dataSource)
      },
      error: (error: any) => console.error('There was an error!', error)
    });
  }
  newCollection() {
    const dialogRef = this.dialog.open(CreateCollectionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const params = new HttpParams().set('userId', this.userId.toString());
        this.http.postCollection(`collections`, {"name": result}, params).subscribe({
          next: (data: any) => {
            this.dataSource = [...this.dataSource, data];
          },
          error: (error: any) => console.error('There was an error!', error)
        });
      }
    });
  }
  deleteCollection(collection: any) {
    this.http.deleteCollection(`collections/${collection.collectionId}`).subscribe({
      next: (data: any) => {
        console.log("data: ", data)
        this.dataSource = this.dataSource.filter((element: any) => element.id !== collection.id);
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