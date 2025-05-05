import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  imports: [MatIconModule, RouterModule],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.css'
})
export class HeaderBarComponent {

}