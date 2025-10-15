import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { FilmDetailPage } from './pages/film-detail-page/film-detail-page';
import { CreateFilmPage } from './pages/create-film-page/create-film-page';

export const routes: Routes = [
    { path: 'home', component: HomePage },
    { path: 'film', component: FilmDetailPage },
    { path: 'create', component: CreateFilmPage },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];