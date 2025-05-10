import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'app-genre-feature-bar',
  imports: [],
  templateUrl: './genre-feature-bar.component.html',
  styleUrl: './genre-feature-bar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GenreFeatureBarComponent {
    @Input() featuredGenreData:any;
}