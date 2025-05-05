import { Routes,} from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { SiteSettingsPageComponent } from './site-settings-page/site-settings-page.component';
import { SearchResultsPageComponent } from './search-results-page/search-results-page.component';
import { GamePageComponent } from './game-page/game-page.component';

export const routes: Routes = [
    {
        path: '', 
        component: HomePageComponent
    },
    {
        path: 'home', 
        component: HomePageComponent
    },
    {
        path: 'profile',
        component: ProfilePageComponent
    },
    {
        path: 'help',
        component: HelpPageComponent
    },
    {
        path: 'settings',
        component: SiteSettingsPageComponent
    }, 
    {
        path: 'search-results',
        component: SearchResultsPageComponent
    },
    {
        path: 'game-page',
        component: GamePageComponent
    }
];