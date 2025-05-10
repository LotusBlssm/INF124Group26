import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-genre-tag',
  imports: [],
  templateUrl: './genre-tag.component.html',
  styleUrl: './genre-tag.component.css'
})
export class GenreTagComponent {
  @Input() text:string = "";

  get color() {
    return `hsl(90, 0%, 80%)`;
  }
}
