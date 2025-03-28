import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar-admin',
  imports: [CommonModule],
  templateUrl: './side-bar-admin.component.html',
  styleUrl: './side-bar-admin.component.scss',
})
export class SideBarAdminComponent {

  showFilters = false;
  showSessions = false;
  showSemestres = false;
  showSections = false;
  showNiveaux = false;
  showModules = false;

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

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  toggleSessions() {
    this.showSessions = !this.showSessions;
  }

  toggleSemestres() {
    this.showSemestres = !this.showSemestres;
  }

  toggleSections() {
    this.showSections = !this.showSections;
  }

  toggleNiveaux() {
    this.showNiveaux = !this.showNiveaux;
  }

  toggleModules() {
    this.showModules = !this.showModules;
  }

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
}

