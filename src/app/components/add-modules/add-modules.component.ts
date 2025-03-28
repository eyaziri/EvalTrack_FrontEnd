import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-modules',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-modules.component.html',
  styleUrl: './add-modules.component.scss'
})
export class AddModulesComponent {

  filieres = ['Informatique', 'GSIL', 'Infotronique','Mecatronique'];
  semestres = ['Semestre 1', 'Semestre 2'];
  modules = [1, 2, 3, 4, 5];
  modulesMatieres: { id: number; nombreMatieres: number; matieres: any[] }[] = [];

  selectedFiliere = '';
  selectedSemestre = '';
  selectedModule = 0;
  selectedMatiere = 0;
  showMatiereForm = false;
  showMatiere = false;
  showMatieresInputs = false;  // Pour afficher les champs "Nombre de matières"
  showMatieresForms = false;


  toggleMatiere(): void {
    this.showMatiere = true;
  }
  generateModulesMatieres() {
    this.modulesMatieres = [];
    for (let i = 1; i <= this.selectedModule; i++) {
      this.modulesMatieres.push({
        id: i,
        nombreMatieres: 0,  // Initialisation vide
        matieres: []        // Liste vide de matières
      });
    }
    this.showMatieresInputs = true;
    this.showMatieresForms = false;
  }

  // Étape 2 : Générer les formulaires de matières après avoir défini leur nombre
  generateMatieresForms() {
    this.modulesMatieres.forEach(module => {
      module.matieres = [];
      for (let j = 1; j <= module.nombreMatieres; j++) {
        module.matieres.push({
          id: j,
          nom: '',
          coefficient: '',
          heures: '',
          evaluation: ''
        });
      }
    });
    this.showMatieresForms = true;
  }

  confirm() {
    console.log("Configuration des matières confirmée :", this.modulesMatieres);
    alert("Matières enregistrées avec succès !");
  }
  
}
