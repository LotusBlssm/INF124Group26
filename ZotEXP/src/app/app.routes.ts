import { Routes,} from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { HelpPageComponent } from './Pages/help-page/help-page.component';
import { SiteSettingsPageComponent } from './Pages/site-settings-page/site-settings-page.component';
import { SearchResultsPageComponent } from './Pages/search-results-page/search-results-page.component';
import { GamePageComponent } from './Pages/game-page/game-page.component';

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
        path: 'search',
        component: SearchResultsPageComponent
    },
    {
        path: 'game/:id',
        component: GamePageComponent
    }
];