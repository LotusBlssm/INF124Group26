import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserTagComponent } from '../user-tag/user-tag.component';

@Component({
  selector: 'app-search-result',
  imports: [UserTagComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchResultComponent {
  @Input() gameData: any;
}
