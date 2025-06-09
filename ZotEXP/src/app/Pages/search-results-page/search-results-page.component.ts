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
  filteredSortedResults:any = []; 
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
    this.loadSearchResults(this.query);

    // Angular doesn't reload the component when a new search is made within the search results component
    // So we need to set up that detection manually here.
    this.route.queryParamMap.subscribe(params => {
      console.log('change detected');
      const newQuery = params.get('query');
      console.log('new sword: ' + newQuery);
      this.loadSearchResults(newQuery);
    });

    // Ensures Angular detects filter selection changes
    this.sortForm.valueChanges.subscribe(val => {
      this.sortSearchResults();
    });
  }

  async loadSearchResults(query: any) {
    this.getSearchResults(query);
  }
  
  getSearchResults(query: any) {
    this.apiService.getSearchResults(query).subscribe( (data:any) => {
      this.allSearchResults = data.searchResults;
      this.sortSearchResults();
    });
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
