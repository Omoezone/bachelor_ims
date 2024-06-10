import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../service/userStorage/user.service';
import { HttpServiceService } from '../../service/http/http-service.service';
import { PdfGeneratorService } from '../../service/pdfGenerator/pdf-generator.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../../modals/confirmation/confirmation.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-all-items',
  standalone: true, 
  imports: [
    MatTableModule,
    MatButtonModule,
    FlexLayoutModule,
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule
  ],  
  templateUrl: './all-items.component.html',
  styleUrl: './all-items.component.scss'
})
export class AllItemsComponent {
  displayedColumns: string[] = ['name', 'price', 'type', 'dimensions', 'color', 'amount', 'actions'];
  dataSource = new MatTableDataSource<any>([]); 
  userId: any;
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  constructor(
    private userService: UserService,
    private http: HttpServiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private pdfService: PdfGeneratorService
  ) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    if (this.userId) {
      this.http.allItemsUser(`items/${this.userId}/items`).subscribe({
        next: (data: any) =>
          {
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;

          },
        error: (error: any) => console.error('There was an error!', error)
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }

  deleteItem(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '350px',
      data: {
        message: 'Are you sure you want to delete this item?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    this.http.deleteItem(`items/${item.itemId}`).subscribe({
      next: (data: any) => {
        this.dataSource.data = this.dataSource.data.filter((element: any) => element.itemId !== item.itemId);
        this.dataSource.paginator = this.paginator;
        this.snackBar.open('Item added successful!', 'Close', {
          duration: 2000, 
        });
      },
      error: (error: any) => console.error('There was an error!', error)
    });
  }
});
  }

  exportCollection(): void {
    this.pdfService.generatePDF({ content: this.dataSource.data });
  }

  goBack(): void {
    window.history.back();
  }
}
