import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EtudiantPageAccueilComponent } from "./etudiant-page-accueil/etudiant-page-accueil.component";
import { EtudiantPageConfigurationComponent } from "./etudiant-page-configuration/etudiant-page-configuration.component";
import { EtudiantPageReclamationComponent } from "./etudiant-page-reclamation/etudiant-page-reclamation.component";
import { EtudiantPageDashboardComponent } from "./etudiant-page-dashboard/etudiant-page-dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EtudiantPageAccueilComponent, EtudiantPageConfigurationComponent, EtudiantPageReclamationComponent, EtudiantPageDashboardComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EvalTrack_Frontend';
}
