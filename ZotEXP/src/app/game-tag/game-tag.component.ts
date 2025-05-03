import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-tag',
  imports: [],
  templateUrl: './game-tag.component.html',
  styleUrl: './game-tag.component.css'
})
export class GameTagComponent {
  @Input() text:string = "";

  get color() {
    let hash = 0;
    for (let i = 0; i < this.text.length; i++) {
      hash = this.text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = Math.abs(hash+180) % 360;
    return `hsl(${hue}, 100%, 80%)`;
  }
}
