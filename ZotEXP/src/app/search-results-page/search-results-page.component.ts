import { Component, OnInit } from '@angular/core';
import { SearchResultComponent } from '../search-result/search-result.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-results-page',
  imports: [SearchResultComponent, PaginationModule, ReactiveFormsModule],
  templateUrl: './search-results-page.component.html',
  styleUrl: './search-results-page.component.css'
})

export class SearchResultsPageComponent implements OnInit {
  PAGE_SIZE = 5; // will change with settings
  FILTERS = [
    {
      name: "Release date", 
      filter: (a:any,b:any) => b.releaseDate - a.releaseDate
    },
    {
      name: "Title", 
      filter: (a:any,b:any) => a.title.localeCompare(b.title)
    },
    {
      name: "Rating", 
      filter: (a:any,b:any) => b.rating - a.rating
    }
  ]
  allSearchResults = this.getSearchResults();
  filteredSortedResults = [...this.allSearchResults];
  currentPage = 1;
  sortForm = new FormGroup({
    sortBy: new FormControl(1)
  })

  ngOnInit() {
    this.sortForm.valueChanges.subscribe(val => {
      console.log('event');
      console.log(typeof val);
      this.updatePageResults();
    });
  }

  updatePageResults() {
    let filterIndex : any = this.sortForm.value.sortBy;
    this.filteredSortedResults = this.allSearchResults.sort(this.FILTERS[filterIndex].filter);
  }
  
  // This will change when the backend is made
  getSearchResults() {
    function randomDate(start: Date, end: Date) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    let searchResults = [];
    for (let i = 0; i < 42; ++i) {
      searchResults.push({
        title: "Game " + (i+1),
        image: undefined,
        company: "Company " + (i+1),
        releaseDate: randomDate(new Date(2000, 0, 1), new Date()),
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        rating: Math.random() * 5,
        gameTags: ["FPS", "Team", "Free to Play", "High TTK"],
        userTags: ["Teamwork Heavy", "Not for Noobs", "Mod Supported", "Replayable", "Friendly Community"]
      });
    }
    return searchResults;
  }

  handlePageChange(event:any) {
    this.currentPage = event.page;
  }
}
