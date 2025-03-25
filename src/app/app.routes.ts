import { Routes } from '@angular/router';
import { EtudiantPageAccueilComponent } from './etudiant-page-accueil/etudiant-page-accueil.component';
import { EtudiantPageDashboardComponent } from './etudiant-page-dashboard/etudiant-page-dashboard.component';
import { EtudiantPageConfigurationComponent } from './etudiant-page-configuration/etudiant-page-configuration.component';
import { EtudiantPageReclamationComponent } from './etudiant-page-reclamation/etudiant-page-reclamation.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'etudiant-page-accueil', 
    pathMatch: 'full' 
  },
  { 
    path: 'etudiant-page-accueil',
    component: EtudiantPageAccueilComponent
  },
  { 
    path: 'etudiant-page-dashboard',
    component: EtudiantPageDashboardComponent
  },
  { 
    path: 'etudiant-page-configuration',
    component: EtudiantPageConfigurationComponent
  },
  { 
    path: 'etudiant-page-reclamation',
    component: EtudiantPageReclamationComponent
  }
];