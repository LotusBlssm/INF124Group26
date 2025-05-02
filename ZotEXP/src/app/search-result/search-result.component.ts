import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  imports: [],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  @Input() gameData: any;
}
