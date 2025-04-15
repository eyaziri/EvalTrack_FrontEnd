import { Component   } from '@angular/core';
import{CommonModule} from '@angular/common';
import { NgFor } from '@angular/common';
interface Matiere {
  nom: string;
  coefficient: number;
  ponderation?: number;
  cc?: number;
  exam?: number;
  moyenne?: number;
  etat?: string;
  reclamation: boolean;
}

interface UE {
  nom: string;
  coefficient: number;
  matieres: Matiere[];
}

@Component({
  selector: 'app-notes-table',
  imports: [CommonModule,NgFor],
  templateUrl: './notes-table.component.html',
  styleUrl: './notes-table.component.scss'
})
export class NotesTableComponent {
  headers = [
    'UE', 'COEF UE', 'MATIERE', 'COEF MATIERE', 
    'PONDERATION', 'CC', 'EXAM', 'MOYENNE', 
    'ETAT', 'RECLAMATION/TELECHARGEMENT'
  ];

  ueData: UE[] = [
    {
      nom: 'UE 2.6',
      coefficient: 6,
      matieres: [
        {
          nom: 'Théorie des langages et Compilation',
          coefficient: 3,
          ponderation: 0.5,
          cc: 14,
          exam: 12,
          moyenne: 13,
          etat: 'Validé',
          reclamation: false
        },
        {
          nom: 'Intelligence Artificielle',
          coefficient: 3,
          ponderation: 0.5,
          cc: 15,
          exam: 16,
          moyenne: 15.5,
          etat: 'Validé',
          reclamation: true
        }
      ]
    },
    {
      nom: 'UE 2.7',
      coefficient: 5.5,
      matieres: [
        {
          nom: 'Sécurité informatique',
          coefficient: 2,
          ponderation: 0.4,
          cc: 11,
          exam: 14,
          moyenne: 12.8,
          etat: 'Validé',
          reclamation: false
        },
        {
          nom: 'Programmation et Administration Système et Réseaux',
          coefficient: 3.5,
          ponderation: 0.6,
          cc: 13,
          exam: 15,
          moyenne: 14.2,
          etat: 'Validé',
          reclamation: false
        }
      ]
    },
    // Ajoutez les autres UE de la même manière
  ];

  // Méthode pour gérer les actions
  handleAction(matiere: Matiere) {
    if (matiere.reclamation) {
      // Logique pour réclamation
      console.log('Réclamation pour:', matiere.nom);
    } else {
      // Logique pour téléchargement
      console.log('Téléchargement pour:', matiere.nom);
    }
  }
  handleDownload(matiere: any) {
    console.log('Téléchargement pour:', matiere.nom);
    // Implémentez la logique de téléchargement ici
  }

  handleReclamation(matiere: any) {
    console.log('Réclamation pour:', matiere.nom);
    // Implémentez la logique de réclamation ici
  }
}
