import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../service/userStorage/user.service';
import { HttpServiceService } from '../../service/http/http-service.service';
import { PdfGeneratorService } from '../../service/pdfGenerator/pdf-generator.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-all-items',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatSortModule,
  ],  
  templateUrl: './all-items.component.html',
  styleUrl: './all-items.component.scss'
})
export class AllItemsComponent {
  displayedColumns: string[] = ['name', 'price', 'type', 'dimensions', 'color', 'amount', 'actions'];
  dataSource = new MatTableDataSource<any>([]); 
  userId: any;
  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private http: HttpServiceService,
    private pdfService: PdfGeneratorService
  ) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    if (this.userId) {
      this.http.allItemsUser(`items/${this.userId}/items`).subscribe({
        next: (data: any) =>
          {
            this.dataSource.data = data;
          },
        error: (error: any) => console.error('There was an error!', error)
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    }, 1000);
  }

  deleteItem(item: any): void {
    this.http.deleteItem(`items/${item.itemId}`).subscribe({
      next: (data: any) => {
        this.dataSource.data = this.dataSource.data.filter((element: any) => element.itemId !== item.itemId);
      },
      error: (error: any) => console.error('There was an error!', error)
    });
  }

  exportCollection(): void {
    this.pdfService.generatePDF({ content: this.dataSource.data });
  }

  goBack(): void {
    window.history.back();
  }
}
