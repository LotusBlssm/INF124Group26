import { Component, OnInit } from '@angular/core';
import { SearchResultComponent } from '../../search-result/search-result.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../api.service';


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

  allSearchResults:any = [];
  filteredSortedResults:any = []; // may bug if getSearchResults is async
  currentPage = 1;
  sortForm = new FormGroup({
    sortBy: new FormControl(1)
  })
  get query() {
    let query = this.route.snapshot.queryParamMap.get('query');
    if (query != null) {
      return decodeURIComponent(query);
    }
    return null;
  }

  constructor(private route: ActivatedRoute, private apiService: APIService) {}

  ngOnInit() {
    // Retreiving search results
    this.loadSearchResults();

    // Angular doesn't reload the component when a new search is made within the search results component
    // So we need to set up that detection manually here.
    this.route.queryParamMap.subscribe(params => {
      const newQuery = params.get('query');
      this.loadSearchResults();
    });

    // Ensures Angular detects filter selection changes
    this.sortForm.valueChanges.subscribe(val => {
      this.sortSearchResults();
    });
  }

  loadSearchResults() {
    this.getSearchResults();
    this.sortSearchResults();
  }
  
  getSearchResults() {
    let searchResults:any = [];
    // TODO: ACTUALLY GET THE DATABASE LSK:DJFSLFDSJFL
    console.log('Loading Search Result Data from component...')
    this.apiService.getSearchResults(this.query).subscribe(data => {
      console.log('Component received data: ' + data);
      console.log(data);
      this.allSearchResults = data;
    });
    
    return searchResults;

    // USE THIS TO REVTRIEVE FAKE DATA
    // function randomDate(start: Date, end: Date) {
    //   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // }
    // for (let i = 0; i < 42; ++i) {
    //   searchResults.push({
    //     title: "Game " + (i+1),
    //     image: undefined,
    //     company: "Company " + (i+1),
    //     releaseDate: randomDate(new Date(2000, 0, 1), new Date()),
    //     description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    //     rating: Math.random() * 5,
    //     gameTags: ["FPS", "Team", "Free to Play", "High TTK"],
    //     userTags: ["Teamwork Heavy", "Not for Noobs", "Mod Supported", "Replayable", "Friendly Community"]
    //   });
    // }
    // return searchResults;
  }

  sortSearchResults() {
    let filterIndex : any = this.sortForm.value.sortBy;
    this.filteredSortedResults = this.allSearchResults.sort(this.FILTERS[filterIndex].filter);
  }

  // for the pagination
  handlePageChange(event:any) {
    this.currentPage = event.page;
  }
}
