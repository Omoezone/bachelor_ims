import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../service/http/http-service.service';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateItemComponent } from '../modals/create-item/create-item.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-detail-collection',
  standalone: true,
  imports: [
    MatTableModule,
    MatButton,
    CommonModule,
    CreateItemComponent,
    MatDialogModule
  ],
  templateUrl: './detail-collection.component.html',
  styleUrl: './detail-collection.component.scss'
})
export class DetailCollectionComponent {
  displayedColumns: string[] = ['name', 'price', 'amount', 'type', 'dimensions', 'color'];
  dataSource!: any;
  collectionId: string = '';

  itemName: string = '';
  itemPrice: number | null = null;
  itemAmount: number | null = null;
  itemType: string = '';
  itemWidth: number | null = null;
  itemHeight: number | null = null;
  itemColor: string = '';

  constructor(
    private route: ActivatedRoute, 
    private http: HttpServiceService,
    public dialog: MatDialog
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
    const dialogRef = this.dialog.open(CreateItemComponent, {
      width: '40%',
      data: {
        name: this.itemName,
        price: this.itemPrice,
        amount: this.itemAmount,
        type: this.itemType,
        width: this.itemWidth,
        height: this.itemHeight,
        color: this.itemColor
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result: ", result, this.collectionId)
      if (result) {      
          if (this.collectionId) {
            const params = new HttpParams().set('collectionId', this.collectionId.toString());
            this.http.postItem(`items`, result, params).subscribe({
              next: (data: any) =>
                {
                  this.dataSource = [...this.dataSource, data];
                },
              error: (error: any) => console.error('There was an error!', error)
            });
          }
      }
      console.log('The dialog was closed. Result:', result);
    });
  }
}
