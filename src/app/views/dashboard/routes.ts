import { Routes } from '@angular/router';
import { EncuestaComponent } from '../../../components/encuesta/encuesta.component';
import { HistoricaComponent } from '../../../components/historica/historica.component';
import { $localize } from '@angular/localize/init';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    data: {
      title: $localize`Dashboard`
    }
  },
  {
    path: 'encuesta',
    component: EncuestaComponent
  },
  {
    path: 'historica',
    component: HistoricaComponent
  }
];

