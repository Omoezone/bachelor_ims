import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../service/http/http-service.service';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateItemComponent } from '../create-item/create-item.component';

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
  displayedColumns: string[] = ['itemId', 'name', 'price', 'amount', 'type', 'dimensions', 'color'];
  dataSource!: any;
  constructor(
    private route: ActivatedRoute, 
    private http: HttpServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        console.log("entered id part")
        this.http.getItemCollections(`collections/${id}/items`).subscribe({
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
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result:', result);
    });
  }
}
