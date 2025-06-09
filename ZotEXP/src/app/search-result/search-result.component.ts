import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { UserTagComponent } from '../user-tag/user-tag.component';

@Component({
  selector: 'app-search-result',
  imports: [UserTagComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchResultComponent implements OnInit {
  @Input() gameData: any;

  ngOnInit(): void {
    this.gameData.releaseDate = new Date(this.gameData.releaseDate);
  } 

  getGameURL(id: any) {
    return "/game/" + id;
  }
}
