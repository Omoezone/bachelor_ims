import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsBase, Items } from '../../types/items';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { CreateItemComponent } from '../../modals/create-item/create-item.component';
import { PdfGeneratorService } from '../../service/pdfGenerator/pdf-generator.service';
import { HttpServiceService } from '../../service/http/http-service.service';

import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-collection',
  standalone: true,
  imports: [
    MatTableModule,
    MatButton,
    CommonModule,
    CreateItemComponent,
    MatDialogModule,
    MatIcon,
    MatSnackBarModule
  ],
  templateUrl: './detail-collection.component.html',
  styleUrl: './detail-collection.component.scss'
})
export class DetailCollectionComponent {
  displayedColumns: string[] = ['name', 'price', 'type', 'dimensions', 'color', 'amount', 'actions'];
  dataSource!: any;
  collectionId: string = '';

  itemName: string = '';
  itemPrice: number = 0;
  itemAmount: number = 0;
  itemType: string = '';
  itemWidth: number = 0;
  itemHeight: number = 0;
  itemColor: string = '';

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
              this.dataSource = data.items;
            },
          error: (error: any) => console.error('There was an error!', error)
        });
      }
    }); 
  }
  createItem(): void {
    const itemData: ItemsBase = {
      name: this.itemName,
      price: this.itemPrice,
      amount: this.itemAmount,
      type: this.itemType,
      width: this.itemWidth,
      height: this.itemHeight,
      color: this.itemColor
    };

    const dialogRef = this.dialog.open(CreateItemComponent, {
      width: '40%',
      data: itemData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result: ", result, this.collectionId)
      if (result) {      
          if (this.collectionId) {
            const params = new HttpParams().set('collectionId', this.collectionId.toString());
            this.http.postItem(`items`, result, params).subscribe({
              next: (data: any) =>
                {
                  this.dataSource = [...this.dataSource, result];
                  this.snackBar.open('Item added successful!', 'Close', {
                    duration: 2000, 
                  });
                },
              error: (error: any) => console.error('There was an error!', error)
            });
          }
      }
    });
  }

  deleteItem(item: any) {
    this.http.deleteItem(`items/${item.itemId}`).subscribe({
      next: (data: any) => {
        this.dataSource = this.dataSource.filter((element: any) => element.itemId !== item.itemId);
      },
      error: (error: any) => console.error('There was an error!', error)
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
                  const index = this.dataSource.findIndex((i: any) => i.itemId === item.itemId);
                  if (index !== -1) {
                      this.dataSource[index] = result;
                      this.dataSource = [...this.dataSource]; 
                      this.snackBar.open('Item updated successful!', 'Close', {
                        duration: 2000, 
                      });
                  }
                },
                error: (error: any) => console.error('There was an error!', error)
            });
        }
    });
  }
  exportCollection(): void {
    this.pdfService.generatePDF({ content: this.dataSource });
  }
  goBack(): void {
    window.history.back();
  }
}