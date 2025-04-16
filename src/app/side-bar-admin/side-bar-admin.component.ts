import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD


@Component({
  selector: 'app-side-bar-admin',
  imports: [CommonModule,RouterModule],
=======
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-bar-admin',
  imports: [CommonModule,RouterModule,DropdownModule,FormsModule],
>>>>>>> origin/ouma
  templateUrl: './side-bar-admin.component.html',
  styleUrl: './side-bar-admin.component.scss',
})
export class SideBarAdminComponent {

<<<<<<< HEAD
  // Variables pour les filtres de Notes
  showFiltersNotes = false;
  showSessions = false;
  showSemestres = false;
  showSectionsNotes = false;
  showNiveauxNotes = false;
  showModules = false;
=======
>>>>>>> origin/ouma

  // Variables pour les filtres de Liste des étudiants
  showFiltersEtudiants = false;
  showSectionsEtudiants = false;
  showNiveauxEtudiants = false;

<<<<<<< HEAD
  sessions = ['Principal', 'Rattrapage'];
  semestres = ['Semestre 1', 'Semestre 2'];
  sections = ['Informatique', 'Gsil', 'Infotronique', 'Mécatronique'];
  niveaux = ['1ère année', '2ème année', '3ème année'];
  modules = ['Maths', 'Sécurité', 'Programmation', 'Réseaux', 'Base de données'];

  selectedSession?: string;
  selectedSemestre?: string;
  selectedSection?: string;
  selectedNiveau?: string;
  selectedModule?: string;

  constructor(private studentService: StudentService) {}

  // Méthodes pour gérer l'affichage des filtres (Notes)
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

  // Méthodes pour gérer l'affichage des filtres (Liste des étudiants)
  toggleFiltersEtudiants() {
    this.showFiltersEtudiants = !this.showFiltersEtudiants;
  }

  toggleSectionsEtudiants() {
    this.showSectionsEtudiants = !this.showSectionsEtudiants;
  }

  toggleNiveauxEtudiants() {
    this.showNiveauxEtudiants = !this.showNiveauxEtudiants;
  }

  // Sélection des éléments dans les filtres (Notes)
  selectSession(session: string) {
    this.selectedSession = session;
  }

  selectSemestre(semestre: string) {
    this.selectedSemestre = semestre;
  }

  selectSection(section: string) {
    this.studentService.setSelectedSection(section);
  }

  selectNiveau(niveau: string) {
    this.studentService.setSelectedNiveau(niveau);
  }

  selectModule(module: string) {
    this.selectedModule = module;
  }

  addModule(module: string) {
    if (module && !this.modules.includes(module)) {
      this.modules.push(module);
    }
  }
=======
 /* sessions = ['Principal', 'Rattrapage'];
  semestres = ['Semestre 1', 'Semestre 2'];
  sections = ['Informatique', 'Gsil', 'Infotronique', 'Mécatronique'];
  niveaux = ['1ère année', '2ème année', '3ème année'];
  modules = ['Maths', 'Sécurité', 'Programmation', 'Réseaux', 'Base de données'];*/

  

  constructor(private studentService: StudentService,private router: Router) {}

 


 

  
>>>>>>> origin/ouma
}