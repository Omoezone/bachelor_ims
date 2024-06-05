import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Items } from '../../types/items';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CreateItemComponent } from '../../modals/create-item/create-item.component';
import { PdfGeneratorService } from '../../service/pdfGenerator/pdf-generator.service';
import { HttpServiceService } from '../../service/http/http-service.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmationComponent } from '../../modals/confirmation/confirmation.component';

@Component({
  selector: 'app-detail-collection', 
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  templateUrl: './detail-collection.component.html',
  styleUrl: './detail-collection.component.scss'
})
export class DetailCollectionComponent{
  displayedColumns: string[] = ['name', 'price', 'type', 'dimensions', 'color', 'amount', 'actions'];
  dataSource = new MatTableDataSource<any>([]); 
  collectionId: string = '';
  collectionName: string = '';

  itemName: string = '';
  itemPrice: number = 0;
  itemAmount: number = 1;
  itemType: string = '';
  itemWidth: number = 0;
  itemHeight: number = 0; 
  itemColor: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;  
  
  constructor(
    private route: ActivatedRoute, 
    private http: HttpServiceService,
    public dialog: MatDialog,
    private pdfService: PdfGeneratorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.collectionId = params.get('id') ?? '';
      if (this.collectionId) {
        this.http.getItemCollections(`collections/${this.collectionId}/items`).subscribe({
          next: (data: any) =>
            {
              setTimeout(() => {
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
              }, 500);
              this.dataSource.data = data.items;
              this.collectionName = data.collectionName;
            },
          error: (error: any) => console.error('There was an error!', error)
        });
      }
    }); 
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }

  createItem(): void {
    const dialogRef = this.dialog.open(CreateItemComponent, {
      width: '40%',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {      
          if (this.collectionId) {
            const params = new HttpParams().set('collectionId', this.collectionId.toString());
            this.http.postItem(`items`, result, params).subscribe({
              next: (data: any) =>
                {
                  this.dataSource.data = [...this.dataSource.data, data];
                  this.snackBar.open('Item added successful!', 'Close', {
                    duration: 2000, 
                  });
                  this.dataSource.sort = this.sort;
                  this.dataSource.paginator = this.paginator;
                },
              error: (error: any) => console.error('There was an error!', error)
            });
          }
      }
    });
  }

  deleteItem(item: any) {
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
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.snackBar.open('Item deleted successfully!', 'Close', { duration: 2000 });
          },
          error: (error: any) => console.error('There was an error!', error)
        });
      }
    });
  }

  updateItem(item: Items): void {
    const dialogRef = this.dialog.open(CreateItemComponent, {
      width: '40%',
      data: {
        itemId: item.itemId, 
        name: item.name,
        price: item.price,
        amount: item.amount,
        type: item.type,
        width: item.width,
        height: item.height,
        color: item.color,
        collectionId: parseInt(this.collectionId)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.http.updateItem(`items/${item.itemId}`, result).subscribe({
                next: (data: any) => {
                  const index = this.dataSource.data.findIndex((i: any) => i.itemId === item.itemId);
                  if (index !== -1) {
                      this.dataSource.data[index] = result;
                      this.dataSource.data = [...this.dataSource.data]; 
                      this.snackBar.open('Item updated successful!', 'Close', {
                        duration: 2000, 
                      });
                      this.dataSource.sort = this.sort;
                      this.dataSource.paginator = this.paginator;
                  }
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
