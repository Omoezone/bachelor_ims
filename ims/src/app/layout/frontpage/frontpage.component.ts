import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-frontpage',
  standalone: true,
  imports: [MatCardModule, RouterLink, MatButtonModule],
  templateUrl: './frontpage.component.html',
  styleUrl: './frontpage.component.scss'
})
export class FrontpageComponent {

}