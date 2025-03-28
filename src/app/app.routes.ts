import { Routes } from '@angular/router';
import { EtudiantPageAccueilComponent } from './etudiant-page-accueil/etudiant-page-accueil.component';
import { EtudiantPageDashboardComponent } from './etudiant-page-dashboard/etudiant-page-dashboard.component';
import { EtudiantPageConfigurationComponent } from './etudiant-page-configuration/etudiant-page-configuration.component';
import { EtudiantPageReclamationComponent } from './etudiant-page-reclamation/etudiant-page-reclamation.component';
import { AdminPageAcceuilComponent } from './admin-page-acceuil/admin-page-acceuil.component';
import { AdminPageListeEtudiantAdminComponent } from './admin-page-liste-etudiant-admin/admin-page-liste-etudiant-admin.component';
import { AdminPageReclamationComponent } from './admin-page-reclamation/admin-page-reclamation.component';  // Admin
import { AdminPageConfigurationComponent } from './admin-page-configuration/admin-page-configuration.component';  // Admin
import { AdminPageNotesComponent } from './admin-page-notes/admin-page-notes.component';  // Admin
import { AdminPageAjoutModuleComponent } from './admin-page-ajout-module/admin-page-ajout-module.component';  // Admin

import { RoleGuard } from './role.guard';  // Import du guard

export const routes: Routes = [
  // Routes Etudiant
  { path: '', redirectTo: 'etudiant-page-accueil', pathMatch: 'full' },
  { path: 'etudiant-page-accueil', component: EtudiantPageAccueilComponent },
  { path: 'etudiant-page-dashboard', component: EtudiantPageDashboardComponent },
  { path: 'etudiant-page-configuration', component: EtudiantPageConfigurationComponent },
  { path: 'etudiant-page-reclamation', component: EtudiantPageReclamationComponent },

  // Routes Admin
  { 
    path: 'admin/acceuil', 
    component: AdminPageAcceuilComponent, 
    canActivate: [RoleGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'admin/liste-etudiant', 
    component: AdminPageListeEtudiantAdminComponent, 
    canActivate: [RoleGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'admin/reclamation', 
    component: AdminPageReclamationComponent, 
    canActivate: [RoleGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'admin/configuration', 
    component: AdminPageConfigurationComponent, 
    canActivate: [RoleGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'admin/notes', 
    component: AdminPageNotesComponent, 
    canActivate: [RoleGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'admin/ajout-module', 
    component: AdminPageAjoutModuleComponent, 
    canActivate: [RoleGuard], 
    data: { role: 'admin' } 
  }
];
