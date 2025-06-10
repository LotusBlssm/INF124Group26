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
        return [
            {
                name: "Most Popular Today",
                description: "Most rated, played, and currently talked about titles. You know, in case you haven’t heard of them.",
                covers: [
                    {
                        imageURL: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co9m78.webp',
                        href: '/game/338067',
                    },
                    {
                        imageURL: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co9adi.webp',
                        href: '/game/328373',
                    },
                    {
                        imageURL: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co9tlk.webp',
                        href: '/game/329371',
                    },
                    {
                        imageURL: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co9m71.webp',
                        href: '/game/171233',
                    },
                ]
            },
            {
                name: "New Releases",
                description: "The hottest titles released in the past month, find something new to provide input for!",
                covers: [
                    {
                        imageURL: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co95gk.webp',
                        href: '/game/325591',
                    },
                    {
                        imageURL: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co9gam.webp',
                        href: '/game/305152',
                    },
                    {
                        imageURL: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co9xk3.webp',
                        href: '/game/214394',
                    },
                    {
                        imageURL: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co9m78.webp',
                        href: '/game/338067',
                    },
                ]
            },
        ]
    }
}
