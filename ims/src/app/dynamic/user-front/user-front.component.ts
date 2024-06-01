import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpParams } from '@angular/common/http';

import { HttpServiceService } from '../../service/http/http-service.service';
import { UserService } from '../../service/userStorage/user.service';
import { CreateCollectionComponent } from '../../modals/create-collection/create-collection.component';
import { ConfirmationComponent } from '../../modals/confirmation/confirmation.component';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
    MatSortModule,
    MatPaginatorModule,
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './user-front.component.html',
  styleUrl: './user-front.component.scss'
})
export class UserFrontComponent {
  displayedColumns: string[] = ['name', 'groupName', 'itemCount', 'actions'];
  dataSource = new MatTableDataSource<any>([]); 
  userId: any;
  username: string = 'PLACEHOLDER';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  constructor(
    private http: HttpServiceService,
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.username = this.userService.getUserName();
    this.http.getUserCollections(`users/${this.userId}/collections`).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 500);
        this.dataSource.data = data 
        console.log('Data:', this.dataSource)
      },
      error: (error: any) => console.error('There was an error!', error)
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }
  
  newCollection() {
    const dialogRef = this.dialog.open(CreateCollectionComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const params = new HttpParams().set('userId', this.userId.toString());
        this.http.postCollection(`collections`, { "name": result.collectionName, "groupId": result.groupId }, params).subscribe({
          next: (data: any) => {
            this.dataSource.data = [...this.dataSource.data, data];
            this.snackBar.open('Collection added successful!', 'Close', {
              duration: 2000, 
            });
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          },
          error: (error: any) => console.error('There was an error!', error)
        });
      }
    });
  }
  
  deleteCollection(collection: any) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '350px',
      data: {
        message: 'Are you sure you want to delete this collection? All items in this collection will be deleted.'
      } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.deleteCollection(`collections/${collection.collectionId}`).subscribe({
          next: (data: any) => {
            this.dataSource.data = this.dataSource.data.filter((element: any) => element.collectionId !== collection.collectionId);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.snackBar.open('Collection deleted successfully!', 'Close', { duration: 2000 });
          },
          error: (error: any) => {
            console.error('There was an error!', error);
            this.snackBar.open('Failed to delete collection.', 'Close', { duration: 2000 });
          }
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}