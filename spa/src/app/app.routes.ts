import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },

    { path: '', component: HomeComponent },
    { path: 'pokemon/:identifier', component: DetalhesComponent },
];
