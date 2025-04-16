import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-bar-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownModule, FormsModule],
  templateUrl: './side-bar-admin.component.html',
  styleUrl: './side-bar-admin.component.scss',
})
export class SideBarAdminComponent {
  // Filtres pour les notes
  showFiltersNotes = false;
  showSessions = false;
  showSemestres = false;
  showSectionsNotes = false;
  showNiveauxNotes = false;
  showModules = false;

  // Filtres pour la liste des étudiants
  showFiltersEtudiants = false;
  showSectionsEtudiants = false;
  showNiveauxEtudiants = false;

  // Données pour les filtres
  sessions = ['Principal', 'Rattrapage'];
  semestres = ['Semestre 1', 'Semestre 2'];
  sections = ['Informatique', 'Gsil', 'Infotronique', 'Mécatronique'];
  niveaux = ['1ère année', '2ème année', '3ème année'];
  modules = ['Maths', 'Sécurité', 'Programmation', 'Réseaux', 'Base de données'];

  // Valeurs sélectionnées
  selectedSession?: string;
  selectedSemestre?: string;
  selectedSection?: string;
  selectedNiveau?: string;
  selectedModule?: string;

  constructor(private studentService: StudentService, private router: Router) {}

  // Méthodes d'affichage pour les filtres Notes
  toggleFiltersNotes() {
    this.showFiltersNotes = !this.showFiltersNotes;
  }
  toggleSessions() {
    this.showSessions = !this.showSessions;
  }
  toggleSemestres() {
    this.showSemestres = !this.showSemestres;
  }
  toggleSectionsNotes() {
    this.showSectionsNotes = !this.showSectionsNotes;
  }
  toggleNiveauxNotes() {
    this.showNiveauxNotes = !this.showNiveauxNotes;
  }
  toggleModules() {
    this.showModules = !this.showModules;
  }

  // Méthodes d'affichage pour les filtres Étudiants
  toggleFiltersEtudiants() {
    this.showFiltersEtudiants = !this.showFiltersEtudiants;
  }
  toggleSectionsEtudiants() {
    this.showSectionsEtudiants = !this.showSectionsEtudiants;
  }
  toggleNiveauxEtudiants() {
    this.showNiveauxEtudiants = !this.showNiveauxEtudiants;
  }

  // Sélection dans les filtres
  selectSession(session: string) {
    this.selectedSession = session;
  }
  selectSemestre(semestre: string) {
    this.selectedSemestre = semestre;
  }
  selectSection(section: string) {
    this.selectedSection = section;
    this.studentService.setSelectedSection(section);
  }
  selectNiveau(niveau: string) {
    this.selectedNiveau = niveau;
    this.studentService.setSelectedNiveau(niveau);
  }
  selectModule(module: string) {
    this.selectedModule = module;
  }

  // Ajouter un module dynamiquement
  addModule(module: string) {
    if (module && !this.modules.includes(module)) {
      this.modules.push(module);
    }
  }
}
