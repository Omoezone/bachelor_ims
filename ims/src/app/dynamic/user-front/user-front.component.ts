import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpParams } from '@angular/common/http';

import { HttpServiceService } from '../../service/http/http-service.service';
import { UserService } from '../../service/userStorage/user.service';
import { CreateCollectionComponent } from '../../modals/create-collection/create-collection.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

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
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './user-front.component.html',
  styleUrl: './user-front.component.scss'
})
export class UserFrontComponent {
  displayedColumns: string[] = ['name', 'amountItems', 'actions'];
  dataSource!: any;;
  userId: any;
  username: string = 'PLACEHOLDER';

  constructor(
    private http: HttpServiceService,
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.username = this.userService.getUserName();

    this.http.getUserCollections(`users/${this.userId}/collections`).subscribe({
      next: (data: any) => {
        this.dataSource = data
      },
      error: (error: any) => console.error('There was an error!', error)
    });
  }
  newCollection() {
    const dialogRef = this.dialog.open(CreateCollectionComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const params = new HttpParams().set('userId', this.userId.toString());
        this.http.postCollection(`collections`, {"name": result}, params).subscribe({
          next: (data: any) => {
            this.dataSource = [...this.dataSource, data];
            this.snackBar.open('Collection added successful!', 'Close', {
              duration: 2000, 
            });
          },
          error: (error: any) => console.error('There was an error!', error)
        });
      }
    });
  }
  
  deleteCollection(collection: any) {
    this.http.deleteCollection(`collections/${collection.collectionId}`).subscribe({
      next: (data: any) => {
        this.dataSource = this.dataSource.filter((element: any) => element.collectionId !== collection.collectionId);
      },
      error: (error: any) => console.error('There was an error!', error)
    });
  }

  goBack(): void {
    window.history.back();
  }

}