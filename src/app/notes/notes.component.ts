import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
=======
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule,MatSelectModule],
>>>>>>> origin/ouma
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  selectedMatiere: string = '';
<<<<<<< HEAD
  selectedTypeDevoir: string = 'Examen';

=======
  selectedTypeDevoir: string = '';
  sessions = ['Principal', 'Rattrapage'];
  semestres = ['Semestre 1', 'Semestre 2'];
  sections = ['Informatique', 'Gsil', 'Infotronique', 'Mécatronique'];
  modules = ['Maths', 'Sécurité', 'Programmation', 'Réseaux', 'Base de données'];
  matieres = ['Maths', 'Sécurité', 'Programmation', 'Réseaux', 'Base de données'];
>>>>>>> origin/ouma
  students = [
    { num: 1, cin: '12345678', nom: 'Dupont', prenom: 'Jean', note: 15 },
    { num: 2, cin: '87654321', nom: 'Martin', prenom: 'Sophie', note: 17 },
    { num: 3, cin: '56781234', nom: 'Bernard', prenom: 'Paul', note: 14 }
  ];

  isExamen(): boolean {
    return this.selectedTypeDevoir === 'Examen';
  }
}
