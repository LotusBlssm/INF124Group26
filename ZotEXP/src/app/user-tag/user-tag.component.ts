import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-tag',
  imports: [],
  templateUrl: './user-tag.component.html',
  styleUrl: './user-tag.component.css'
})
export class UserTagComponent {
  @Input() text:string = "";

  get color() {
    let hash = 0;
    for (let i = 0; i < this.text.length; i++) {
      hash = this.text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 65%, 45%)`;
  }
}
