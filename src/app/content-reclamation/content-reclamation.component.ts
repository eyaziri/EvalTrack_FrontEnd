import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../Services/reclamation.service';
import { Reclamation } from '../../Services/reclamation.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-reclamation',
  templateUrl: './content-reclamation.component.html',
  styleUrls: ['./content-reclamation.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class ContentReclamationComponent implements OnInit {
  reclamation: Reclamation = {
    type: 'ERREUR_NOTE_DS',
    dateCreation: new Date().toISOString(),
    statut: 'EN_COURS',
    reponseAdmin: 'Votre réclamation est en cours de traitement.',
    dateResolution: '',
    nomProf: '',
    matiereConcerne: '',
    emailEtudiant: '',
    etudiant: {
      idEtudinat: 136,
    },
    administrateur: {
      id: 4,
    },
  };

  workflow: string[] = [
    'Réclamation envoyée',
    'Vérification de la note',
    'Traitement terminé',
  ];
  currentStep: number = 0;
  reclamationEnvoyee: boolean = false;
  reclamationsPrecedentes: Reclamation[] = [];

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.fetchReclamations();
  }

  fetchReclamations(): void {
    this.reclamationService
      .getReclamationsByEtudiant(this.reclamation.etudiant.idEtudinat)
      .subscribe({
        next: (reclamations) => {
          this.reclamationsPrecedentes = reclamations;

          // Si une réclamation existe, on détermine le statut
          if (reclamations && reclamations.length > 0) {
            const reclamation = reclamations[0]; // Prendre la première réclamation
            if (reclamation.statut === 'ACCEPTEE') {
              this.currentStep = 1; // La réclamation est acceptée, donc on va jusqu'à la 3ème étape
            } else if (reclamation.statut === 'TRAITEE') {
              this.currentStep = 2; // La réclamation est traitée, donc on va jusqu'à la 4ème étape
            } else {
              this.currentStep = 0; // Sinon, on reste à la 2ème étape (en cours)
            }
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des réclamations', err);
        },
      });
  }
  
  getStepForReclamation(reclamation: Reclamation): number {
    switch (reclamation.statut) {
      case 'ACCEPTEE':
        return 1;
      case 'TRAITEE':
        return 2;
      case 'EN_COURS':
      default:
        return 0;
    }
  }
  
  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.reclamationService.addReclamation(this.reclamation).subscribe({
        next: (response) => {
          console.log('Réclamation envoyée avec succès', response);
          this.reclamationEnvoyee = true;
          this.fetchReclamationWorkflow();
          form.resetForm();
        },
      });
    }
  }

  fetchReclamationWorkflow() {
    this.reclamationService
      .getReclamationsByEtudiant(this.reclamation.etudiant.idEtudinat)
      .subscribe({
        next: (reclamations) => {
          if (reclamations && reclamations.length > 0) {
            const reclamation = reclamations[0]; // Prendre la première réclamation de l'étudiant
            if (reclamation.statut === 'ACCEPTEE') {
              this.currentStep = 1; // La réclamation est acceptée, donc on va jusqu'à la 3ème étape
            } else if (reclamation.statut === 'TRAITEE') {
              this.currentStep = 2; // La réclamation est traitée, donc on va jusqu'à la 4ème étape
            } else {
              this.currentStep = 0; // Sinon, on reste à la 2ème étape (en cours)
            }
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des réclamations', err);
        },
      });
  }
}
