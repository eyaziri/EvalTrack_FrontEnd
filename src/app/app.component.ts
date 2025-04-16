import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
=======
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgotpassword/forgotpassword.component";


>>>>>>> origin/ouma
import { EtudiantPageAccueilComponent } from "./etudiant-page-accueil/etudiant-page-accueil.component";
import { EtudiantPageConfigurationComponent } from "./etudiant-page-configuration/etudiant-page-configuration.component";
import { EtudiantPageReclamationComponent } from "./etudiant-page-reclamation/etudiant-page-reclamation.component";
import { EtudiantPageDashboardComponent } from "./etudiant-page-dashboard/etudiant-page-dashboard.component";
import { AdminPageListeEtudiantAdminComponent } from "./admin-page-liste-etudiant-admin/admin-page-liste-etudiant-admin.component";
import { AdminPageReclamationComponent } from "./admin-page-reclamation/admin-page-reclamation.component";
import { AdminPageConfigurationComponent } from "./admin-page-configuration/admin-page-configuration.component";
import { AdminPageNotesComponent } from "./admin-page-notes/admin-page-notes.component";
import { AdminPageAjoutModuleComponent } from "./admin-page-ajout-module/admin-page-ajout-module.component";
import { AdminPageAcceuilComponent } from "./admin-page-acceuil/admin-page-acceuil.component";

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [EtudiantPageAccueilComponent, EtudiantPageConfigurationComponent, EtudiantPageReclamationComponent, EtudiantPageDashboardComponent, AdminPageListeEtudiantAdminComponent, AdminPageReclamationComponent, AdminPageConfigurationComponent, AdminPageNotesComponent, AdminPageAjoutModuleComponent, AdminPageAcceuilComponent,RouterOutlet],
=======
  imports: [RouterOutlet, LoginComponent, ForgotPasswordComponent,EtudiantPageAccueilComponent, EtudiantPageConfigurationComponent, EtudiantPageReclamationComponent, EtudiantPageDashboardComponent, AdminPageListeEtudiantAdminComponent, AdminPageReclamationComponent, AdminPageConfigurationComponent, AdminPageNotesComponent, AdminPageAjoutModuleComponent, AdminPageAcceuilComponent,RouterOutlet],

>>>>>>> origin/ouma
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EvalTrack_Frontend';
}
