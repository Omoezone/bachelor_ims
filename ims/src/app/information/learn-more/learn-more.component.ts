import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface Personal {
  name: string;
}

@Component({
  selector: 'app-learn-more',
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    CommonModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './learn-more.component.html',
  styleUrl: './learn-more.component.scss'
})
export class LearnMoreComponent {
  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 2, color: 'lightpink'},
  ];
  organisations: Personal[] = [
    {
      name: 'Easy overviews',
    },
    {
      name: 'All items at one place',
    },
    {
      name: 'Quick access to all information',
    }
  ];
  personal: Personal[] = [
    {
      name: 'Know where you things are',
    },
    {
      name: 'Quickly find your items',
    },
    {
      name: 'Know what you have',
    },
    {
      name: 'Easily accessible from anywhere',
    }
  ];
}
