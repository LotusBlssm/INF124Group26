import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { MatIconModule } from '@angular/material/icon'; 
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchResultsPageComponent } from './Pages/search-results-page/search-results-page.component';
import { GamePageComponent } from "./Pages/game-page/game-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderBarComponent, MatIconModule, SearchResultsPageComponent, GamePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ZotEXP';
}
