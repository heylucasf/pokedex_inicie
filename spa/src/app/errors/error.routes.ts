import { Routes } from '@angular/router';
import { AlgoDeuErradoComponent } from './pagina-de-erros/algo-deu-errado/algo-deu-errado/algo-deu-errado.component';

export const routesErrors: Routes = [
    {
        path: '',
        redirectTo: 'algo-deu-errado',
        pathMatch: 'full'
    },

    { path: 'algo-deu-errado', component: AlgoDeuErradoComponent },
];
