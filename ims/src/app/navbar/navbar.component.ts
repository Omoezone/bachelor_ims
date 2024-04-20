import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatFabButton, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
