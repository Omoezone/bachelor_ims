import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../service/userStorage/user.service';
import { HttpServiceService } from '../../service/http/http-service.service';

import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-all-items',
  standalone: true,
  imports: [
    MatTableModule,
    MatButton,
    CommonModule,
    MatIcon
  ],  
  templateUrl: './all-items.component.html',
  styleUrl: './all-items.component.scss'
})
export class AllItemsComponent {
  displayedColumns: string[] = ['name', 'price', 'type', 'dimensions', 'color', 'amount', 'actions'];
  dataSource!: any;
  userId: any;

  constructor(
    private userService: UserService,
    private http: HttpServiceService,
  ) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    if (this.userId) {
      this.http.allItemsUser(`items/${this.userId}/items`).subscribe({
        next: (data: any) =>
          {
            this.dataSource = data;
          },
        error: (error: any) => console.error('There was an error!', error)
      });
    }
  }
  deleteItem(item: any): void {
    this.http.deleteItem(`items/${item.itemId}`).subscribe({
      next: (data: any) => {
        this.dataSource = this.dataSource.filter((element: any) => element.itemId !== item.itemId);
      },
      error: (error: any) => console.error('There was an error!', error)
    });
  }
  goBack(): void {
    window.history.back();
  }
}
