import { Component } from '@angular/core';
import { SearchResultComponent } from '../search-result/search-result.component';

@Component({
  selector: 'app-search-results-page',
  imports: [SearchResultComponent],
  templateUrl: './search-results-page.component.html',
  styleUrl: './search-results-page.component.css'
})
export class SearchResultsPageComponent {
  stud1 : any = {
    title: "Overwatch",
    image: undefined,
    company: "Blizzard Entertainment",
    releaseDate: "May 10 2016",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    rating: 3.4444,
    gameTags: ["FPS", "Team", "Free to Play", "High TTK"],
    userTags: ["Teamwork Heavy", "Not for Noobs", "Mod Supported", "Replayable", "Friendly Community"]
  }
}
