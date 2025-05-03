import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

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
    }
];
