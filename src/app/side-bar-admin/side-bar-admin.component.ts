import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-bar-admin',
  imports: [CommonModule,RouterModule,DropdownModule,FormsModule],
  templateUrl: './side-bar-admin.component.html',
  styleUrl: './side-bar-admin.component.scss',
})
export class SideBarAdminComponent {


  // Variables pour les filtres de Liste des étudiants
  showFiltersEtudiants = false;
  showSectionsEtudiants = false;
  showNiveauxEtudiants = false;

 /* sessions = ['Principal', 'Rattrapage'];
  semestres = ['Semestre 1', 'Semestre 2'];
  sections = ['Informatique', 'Gsil', 'Infotronique', 'Mécatronique'];
  niveaux = ['1ère année', '2ème année', '3ème année'];
  modules = ['Maths', 'Sécurité', 'Programmation', 'Réseaux', 'Base de données'];*/

  

  constructor(private studentService: StudentService,private router: Router) {}

 


 

  
}