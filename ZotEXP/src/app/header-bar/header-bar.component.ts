import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  imports: [MatIconModule, RouterModule, FormsModule],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.css'
})
export class HeaderBarComponent {
  query: string = ''; 

  onKeyPress(event: any) {
    if (event.key == 'Enter') {
      this.search();
    }
  }

  search() {
    console.log("searching with query " + this.query);
    this.router.navigate(['/search'], { queryParams: { query: encodeURIComponent(this.query) } });
  }

  constructor(private router: Router) {

  }

}