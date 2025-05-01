import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { SectionServiceService } from '../../Services/section-service.service';
import { ModuleService } from '../../Services/module.service';
import { ExamenService } from '../../Services/examen.service';
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
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './notes-table.component.html',
  styleUrl: './notes-table.component.scss',
})
export class NotesTableComponent {
  constructor(
    private sectionService: SectionServiceService,
    private moduleService: ModuleService,
    private examenService: ExamenService
  ) {}
  ngOnInit() {
    this.sectionService.getSections().subscribe({
      next: (data) => {
        console.log('Sections received:', data);

        this.sections = data.map((section) => ({
          idSection: section.idSection,
          nomSection: section.nomSection,
        }));
      },
      error: (err) => {
        console.error('Error fetching sections:', err);
      },
    });
  }

  headers = [
    'UE',
    'COEF UE',
    'MATIERE',
    'COEF MATIERE',
    'PONDERATION',
    'CC',
    'EXAM',
    'MOYENNE',
    'Moyenne unité',
    'ETAT',
    'RECLAMATION/TELECHARGEMENT',
  ];
  idSection = 0;
  selectedSection = '';
  selectedNiveau = '';
  selectedSemestre = '';
  sections: any[] = [];
  modules: any[] = [];
  matieres: any[] = [];
  exams: any[] = [];
  niveaux = ['Niveau 1', 'Niveau 2', 'Niveau 3'];
  semestres = [
    'Semestre 1',
    'Semestre 2',
    'Semestre 3',
    'Semestre 4',
    'Semestre 5',
  ];
  isProcessing = false;

  // Méthode pour gérer les actions
  handleAction(matiere: Matiere) {
    if (matiere.reclamation) {
      // Logique pour réclamation
      console.log('Réclamation pour:', matiere);
    } else {
      // Logique pour téléchargement
      console.log('Téléchargement pour:', matiere.nom);
    }
  }
  handleDownload(matiere: any) {
    console.log('Téléchargement pour:', matiere.lienCopie);
    // Implémentez la logique de téléchargement ici
  }

  handleReclamation(matiere: any) {
    console.log('Réclamation pour:', matiere.nom);
    // Implémentez la logique de réclamation ici
  }
  onSectionChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;

    if (target) {
      const selectedSection = target.value;
      this.idSection = parseInt(selectedSection);
    }
  }
  onSemestreChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;

    if (target) {
      const lastChar = this.selectedSemestre.slice(-1);
      const semestre = parseInt(lastChar);

      this.moduleService.getModuleMatiere(this.idSection, semestre).subscribe({
        next: (data) => {
          console.log('Modules received:', data); // Pour vérifier si la réponse est bien un tableau

          // Vérifie que data est un tableau avant d'utiliser .map()
          if (Array.isArray(data)) {
            this.modules = data.map((item) => ({
              idModule: item.module.idModule,
              nomModule: item.module.nomModule,
              coefModule: item.module.coefModule,
              matieres: item.matieres.map((matiere: any) => ({
                idMatiere: matiere.matiereId,
                nomMatiere: matiere.nom,
                coefMatiere: matiere.coefficient,
                ponderation: matiere.ponderation,
              })),
            }));

            const idEtudiantString = localStorage.getItem('idUser');

            if (idEtudiantString !== null) {
              const idUser = parseInt(idEtudiantString, 10);

              this.examenService.getNoteByStudent(idUser).subscribe({
                next: (data) => {
                  console.log('matiere received:', data);
                  this.exams = data.map((exam: any) => ({
                    idExam: exam.idExam,
                    idMatiere: exam.matiere.matiereId,
                    typeExam: exam.typeExam,
                    lienCopie: exam.typeExam === 'Examen' ? exam.lienCopie : '',
                    noteExamen: exam.typeExam === 'Examen' ? exam.notes : '',
                    noteDS: exam.typeExam === 'DS' ? exam.notes : '',
                  }));
                  this.modules.forEach((module) => {
                    module.matieres.forEach((matiere: any) => {
                      const examsOfMatiere = this.exams.filter(
                        (e) => e.idMatiere === matiere.idMatiere
                      );

                      const exam = examsOfMatiere.find(
                        (e) => e.typeExam === 'Examen'
                      );
                      const ds = examsOfMatiere.find(
                        (e) => e.typeExam === 'DS'
                      );

                      matiere.cc = ds ? ds.noteDS : '-';
                      matiere.exam = exam ? exam.noteExamen : '-';
                      matiere.lienCopie = exam
                        ? exam.lienCopie
                        : ds
                        ? ds.lienCopie
                        : '-';
                      const ponderationMatch = matiere.ponderation.match(
                        /(\d+(\.\d+)?)(?=\*DS)/
                      );
                      const ponderationExamMatch = matiere.ponderation.match(
                        /(\d+(\.\d+)?)(?=\*Examen)/
                      );
                      console.log('Ponderation DS:', ponderationMatch[0]);
                      console.log('Ponderation Examen:', ponderationExamMatch[1]);
                      if (matiere.cc >= 0 && matiere.exam >= 0) {
                        matiere.moyenne = (
                         parseFloat (ponderationMatch[0]) * matiere.cc +
                          parseFloat (ponderationExamMatch[1]) * matiere.exam
                        ).toFixed(2); // Calcul de la moyenne avec les pondérations extraites
                      } else {
                        matiere.moyenne = '-'; // Si l'une des notes est invalide, on met '-'
                      }
                    });
                  });
                },
                error: (err) => {
                  console.error('Error fetching sections:', err);
                },
              });
            } else {
              console.error(
                'idUser not found in localStorage. Cannot fetch notes.'
              );
              // éventuellement rediriger ou afficher un message d’erreur
            }
          } else {
            console.error('Data is not an array', data); // Si ce n'est pas un tableau, affiche l'erreur
          }
        },
        error: (err) => {
          console.error('Error fetching modules:', err);
        },
      });
    }
  }
}
