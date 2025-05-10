import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenreTagComponent } from '../../genre-tag/genre-tag.component';
import { GenreFeatureBarComponent } from '../../genre-feature-bar/genre-feature-bar.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterOutlet, GenreTagComponent, GenreFeatureBarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageComponent {
    genreTags: any = ["FPS", "Puzzle", "RTS", "Singleplayer Story", "Sandbox", "Visual Novel", "Experimental", "Platformer", "Party", "Survival", "Simulator", "Tycoon", "Fighting", "MMORPG", "MOBA", "Hero Shooter", "Battle Royale", "Horror", "City Building"]
    featuredGenres: any = this.getFeaturedGenres();
    
    getFeaturedGenres () {
        let featuredGenres = []
        let names = ["Most Popular Today", "New Releases", "Free to Play", "Critically Rated"]
        let descriptions = ["Most rated, played, and currently talked about titles. You know, in case you haven’t heard of them.", "The hottest titles released in the past month, find something new to provide input for!", "desc3...", "desc4..."]
        for (let i = 0; i < 4; ++i) {
            featuredGenres.push({
                name: names[i],
                description: descriptions[i],
                covers: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
            })
        }
        console.log(featuredGenres);
        return featuredGenres;
    }
}
