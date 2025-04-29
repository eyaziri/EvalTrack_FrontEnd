import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-modules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-modules.component.html',
  styleUrls: ['./add-modules.component.scss']
})
export class AddModulesComponent {
  // Données de base
  filieres = ['Informatique', 'GSIL', 'Infotronique', 'Mecatronique'];
  semestres = ['Semestre 1', 'Semestre 2', 'Semestre 3', 'Semestre 4'];
  
  // Sélections utilisateur
  selectedFiliere = this.filieres[0];
  selectedSemestre = this.semestres[0];
  
  // Gestion des vues
  currentView: 'main' | 'add' | 'edit' | 'delete' = 'main';
  actionType: string | null = null;
  
  // Données des modules existants
  existingModules = [
    { 
      id: 1, 
      nom: 'Algorithmique', 
      matieres: [
        { id: 1, nom: 'Structures de données', coefficient: 3, heures: 30, evaluation: 'Examen' },
        { id: 2, nom: 'Algorithmes avancés', coefficient: 2, heures: 20, evaluation: 'Contrôle continu' },
        { id: 3, nom: 'Complexité algorithmique', coefficient: 2, heures: 25, evaluation: 'Examen' }
      ] 
    },
    { 
      id: 2, 
      nom: 'Base de données', 
      matieres: [
        { id: 1, nom: 'SQL', coefficient: 2, heures: 25, evaluation: 'Examen' },
        { id: 2, nom: 'Modélisation MERISE', coefficient: 1, heures: 15, evaluation: 'Projet' },
        { id: 3, nom: 'NoSQL', coefficient: 1, heures: 20, evaluation: 'Contrôle continu' }
      ] 
    },
    { 
      id: 3, 
      nom: 'Programmation', 
      matieres: [
        { id: 1, nom: 'POO', coefficient: 3, heures: 35, evaluation: 'Examen' },
        { id: 2, nom: 'Design Patterns', coefficient: 2, heures: 25, evaluation: 'Projet' },
        { id: 3, nom: 'Tests unitaires', coefficient: 1, heures: 15, evaluation: 'Contrôle continu' }
      ] 
    },
    { 
      id: 4, 
      nom: 'Réseaux', 
      matieres: [
        { id: 1, nom: 'Protocoles TCP/IP', coefficient: 2, heures: 30, evaluation: 'Examen' },
        { id: 2, nom: 'Configuration réseau', coefficient: 3, heures: 40, evaluation: 'Projet' }
      ] 
    }
  ];
  
  // Variables pour l'ajout
  newModule = {
    nom: '',
    nbMatieres: 1,
    matieres: [] as any[]
  };
  
  selectedModuleForMatiere: number | null = null;
  newMatiere = { nom: '', coefficient: 1, heures: 15, evaluation: 'Examen' };
  
  // Variables pour la modification
  selectedModuleToEdit: number | null = null;
  moduleToEdit: any = null;
  
  selectedModuleForMatiereEdit: number | null = null;
  matieresForEdit: any[] = [];
  selectedMatiereToEdit: number | null = null;
  matiereToEdit: any = null;
  
  // Variables pour la suppression
  selectedModuleToDelete: number | null = null;
  selectedModuleForMatiereDelete: number | null = null;
  matieresForDelete: any[] = [];
  selectedMatiereToDelete: number | null = null;
  moduleDetails: any = null;
  matiereDetails: any = null;
  
  constructor() {
    this.initNewMatieres();
  }
  
  // Méthodes de navigation
  switchView(view: 'main' | 'add' | 'edit' | 'delete') {
    this.currentView = view;
    this.actionType = null;
    this.resetForms();
  }
  
  setActionType(type: string) {
    this.actionType = type;
    this.resetForms();
  }
  
  resetAction() {
    this.actionType = null;
    this.resetForms();
  }
  
  resetForms() {
    this.newModule = { nom: '', nbMatieres: 1, matieres: [] };
    this.initNewMatieres();
    this.newMatiere = { nom: '', coefficient: 1, heures: 15, evaluation: 'Examen' };
    this.moduleToEdit = null;
    this.matiereToEdit = null;
    this.selectedModuleToEdit = null;
    this.selectedModuleForMatiere = null;
    this.selectedModuleToDelete = null;
    this.selectedModuleForMatiereDelete = null;
    this.selectedMatiereToDelete = null;
    this.matieresForEdit = [];
    this.matieresForDelete = [];
    this.moduleDetails = null;
    this.matiereDetails = null;
  }
  
  // Méthodes pour l'ajout
  initNewMatieres() {
    this.newModule.matieres = [];
    for (let i = 0; i < this.newModule.nbMatieres; i++) {
      this.newModule.matieres.push({ 
        nom: '', 
        coefficient: 1, 
        heures: 15, 
        evaluation: 'Examen' 
      });
    }
  }
  
  addNewModule() {
    if (!this.newModule.nom || this.newModule.matieres.some(m => !m.nom)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    const newId = this.existingModules.length > 0 
      ? Math.max(...this.existingModules.map(m => m.id)) + 1 
      : 1;
    
    const newModule = {
      id: newId,
      nom: this.newModule.nom,
      matieres: this.newModule.matieres.map((m, i) => ({
        id: i + 1,
        nom: m.nom,
        coefficient: m.coefficient,
        heures: m.heures,
        evaluation: m.evaluation
      }))
    };
    
    this.existingModules.push(newModule);
    alert('Module ajouté avec succès!');
    this.resetAction();
    this.switchView('main');
  }
  
  addNewMatiere() {
    if (!this.selectedModuleForMatiere || !this.newMatiere.nom) {
      alert('Veuillez sélectionner un module et remplir le nom de la matière');
      return;
    }
    
    const moduleIndex = this.existingModules.findIndex(m => m.id === this.selectedModuleForMatiere);
    if (moduleIndex !== -1) {
      const newMatiereId = this.existingModules[moduleIndex].matieres.length > 0
        ? Math.max(...this.existingModules[moduleIndex].matieres.map(m => m.id)) + 1
        : 1;
      
      this.existingModules[moduleIndex].matieres.push({
        id: newMatiereId,
        nom: this.newMatiere.nom,
        coefficient: this.newMatiere.coefficient,
        heures: this.newMatiere.heures,
        evaluation: this.newMatiere.evaluation
      });
      
      alert('Matière ajoutée avec succès!');
      this.resetAction();
      this.switchView('main');
    }
  }
  
  // Méthodes pour la modification

// Méthode pour charger le module à modifier
// Méthode pour charger le module à modifier


saveModuleChanges() {
  if (!this.isModuleFormValid()) {
    alert('Veuillez remplir correctement le formulaire');
    return;
  }

  const moduleIndex = this.existingModules.findIndex(m => m.id === this.selectedModuleToEdit);
  if (moduleIndex !== -1) {
    // Met à jour seulement le nom (garder les matières existantes)
    this.existingModules[moduleIndex] = {
      ...this.existingModules[moduleIndex],
      nom: this.moduleToEdit.nom.trim()
    };
    
    alert('Module modifié avec succès!');
    this.resetAction();
    this.switchView('main');
  }
}

// Nouvelle méthode pour gérer les changements
onModuleNameChange() {
  // Force la détection des changements
  this.moduleToEdit = {...this.moduleToEdit};
}

// Méthode de validation du formulaire
isModuleFormValid(): boolean {
  return !!this.selectedModuleToEdit && 
         !!this.moduleToEdit?.nom?.trim();
}
// Modifiez loadModuleToEdit()
loadModuleToEdit() {
  if (this.selectedModuleToEdit) {
    const originalModule = this.existingModules.find(m => m.id === this.selectedModuleToEdit);
    if (originalModule) {
      // Crée une COPIE modifiable
      this.moduleToEdit = {
        ...originalModule,
        matieres: [...originalModule.matieres]
      };
    }
  } else {
    this.moduleToEdit = null;
  }
}

// Méthodes pour la modification de matière
// Charge les matières du module sélectionné

// Charge les données de la matière sélectionnée
loadMatiereToEdit() {
  console.log('Début loadMatiereToEdit - selectedMatiereToEdit:', this.selectedMatiereToEdit);
  
  if (this.selectedMatiereToEdit !== null && this.selectedModuleForMatiereEdit !== null) {
    const module = this.existingModules.find(m => m.id === Number(this.selectedModuleForMatiereEdit));
    
    if (module) {
      console.log('Module trouvé:', module.nom);
      const matiere = module.matieres.find(m => m.id === Number(this.selectedMatiereToEdit));
      
      if (matiere) {
        console.log('Matière trouvée:', matiere.nom);
        this.matiereToEdit = {
          id: matiere.id,
          nom: matiere.nom,
          coefficient: matiere.coefficient,
          heures: matiere.heures,
          evaluation: matiere.evaluation
        };
      } else {
        console.warn('Matière non trouvée avec ID:', this.selectedMatiereToEdit);
      }
    }
  } else {
    this.matiereToEdit = null;
  }
  
  console.log('Fin loadMatiereToEdit - matiereToEdit:', this.matiereToEdit);
}

// Vérifie si on peut sauvegarder
canSaveMatiere(): boolean {
  return !!this.matiereToEdit?.nom?.trim() && 
         !!this.matiereToEdit?.coefficient &&
         !!this.matiereToEdit?.heures &&
         !!this.selectedModuleForMatiereEdit &&
         !!this.selectedMatiereToEdit;
}

// Sauvegarde les modifications
saveMatiereChanges() {
  if (!this.canSaveMatiere()) {
    alert('Veuillez remplir tous les champs correctement');
    return;
  }

  const moduleIndex = this.existingModules.findIndex(m => m.id === this.selectedModuleForMatiereEdit);
  if (moduleIndex !== -1) {
    const matiereIndex = this.existingModules[moduleIndex].matieres.findIndex(m => m.id === this.selectedMatiereToEdit);
    if (matiereIndex !== -1) {
      // Met à jour la matière
      this.existingModules[moduleIndex].matieres[matiereIndex] = {...this.matiereToEdit};
      alert('Matière modifiée avec succès!');
      this.resetAction();
      this.switchView('main');
    }
  }
}
// Assurez-vous que cette méthode est bien dans votre composant
getMatieresForModule(moduleId: any): any[] {
  // Convertit moduleId en number au cas où
  const id = Number(moduleId);
  const module = this.existingModules.find(m => m.id === id);
  return module ? module.matieres : [];
}

ngAfterViewInit() {
  console.log('Modules disponibles:', this.existingModules);
}

loadMatieresForEdit() {
  console.log('Module sélectionné:', this.selectedModuleForMatiereEdit, typeof this.selectedModuleForMatiereEdit);
  console.log('Matières trouvées:', this.getMatieresForModule(this.selectedModuleForMatiereEdit));
  this.selectedMatiereToEdit = null;
  this.matiereToEdit = null;
}

// Méthode utilitaire
getModuleMatieres(moduleId: number): any[] {
  const module = this.existingModules.find(m => m.id === moduleId);
  return module ? module.matieres : [];
}
  
  // Méthodes pour la suppression
  loadModuleDetails() {
    if (this.selectedModuleToDelete) {
      const module = this.existingModules.find(m => m.id === Number(this.selectedModuleToDelete));
      this.moduleDetails = module ? {...module} : null;
      console.log('Module details:', this.moduleDetails); // Debug
    } else {
      this.moduleDetails = null;
    }
  }
  getMatieresForDelete(moduleId: number): any[] {
    const module = this.existingModules.find(m => m.id === Number(moduleId));
    return module ? module.matieres : [];
  }
  
  confirmDeleteModule() {
    if (this.selectedModuleToDelete) {
      const index = this.existingModules.findIndex(m => m.id === this.selectedModuleToDelete);
      if (index !== -1) {
        this.existingModules.splice(index, 1);
        alert('Module supprimé avec succès!');
        this.resetAction();
        this.switchView('main');
      }
    }
  }
  
  loadMatieresForDelete() {
    if (this.selectedModuleForMatiereDelete) {
      const module = this.existingModules.find(m => m.id === this.selectedModuleForMatiereDelete);
      this.matieresForDelete = module ? [...module.matieres] : [];
      this.selectedMatiereToDelete = null;
      this.matiereDetails = null;
    } else {
      this.matieresForDelete = [];
    }
  }
  
  loadMatiereDetails() {
    if (this.selectedMatiereToDelete && this.selectedModuleForMatiereDelete) {
      const module = this.existingModules.find(m => m.id === this.selectedModuleForMatiereDelete);
      if (module) {
        const matiere = module.matieres.find(m => m.id === this.selectedMatiereToDelete);
        this.matiereDetails = matiere ? {...matiere} : null;
      }
    } else {
      this.matiereDetails = null;
    }
  }
  
  confirmDeleteMatiere() {
    if (this.selectedMatiereToDelete && this.selectedModuleForMatiereDelete) {
      const moduleIndex = this.existingModules.findIndex(m => m.id === this.selectedModuleForMatiereDelete);
      if (moduleIndex !== -1) {
        const matiereIndex = this.existingModules[moduleIndex].matieres.findIndex(m => m.id === this.selectedMatiereToDelete);
        if (matiereIndex !== -1) {
          this.existingModules[moduleIndex].matieres.splice(matiereIndex, 1);
          alert('Matière supprimée avec succès!');
          this.resetAction();
          this.switchView('main');
        }
      }
    }
  }
  
  // Méthodes utilitaires pour les getters dans le template
  getModuleName(moduleId: number): string {
    const module = this.existingModules.find(m => m.id === moduleId);
    return module ? module.nom : 'Inconnu';
  }
  
  getMatiereCount(moduleId: number): number {
    const module = this.existingModules.find(m => m.id === moduleId);
    return module ? module.matieres.length : 0;
  }
  
 
  
  getMatiereName(matiereId: number | null): string {
    if (!matiereId || !this.selectedModuleForMatiereDelete) return 'Inconnu';
    const module = this.existingModules.find(m => m.id === this.selectedModuleForMatiereDelete);
    if (!module) return 'Inconnu';
    const matiere = module.matieres.find(m => m.id === matiereId);
    return matiere ? matiere.nom : 'Inconnu';
  }
  
  getMatiereCoefficient(matiereId: number | null): number {
    if (!matiereId || !this.selectedModuleForMatiereDelete) return 0;
    const module = this.existingModules.find(m => m.id === this.selectedModuleForMatiereDelete);
    if (!module) return 0;
    const matiere = module.matieres.find(m => m.id === matiereId);
    return matiere ? matiere.coefficient : 0;
  }
  
  getMatiereHeures(matiereId: number | null): number {
    if (!matiereId || !this.selectedModuleForMatiereDelete) return 0;
    const module = this.existingModules.find(m => m.id === this.selectedModuleForMatiereDelete);
    if (!module) return 0;
    const matiere = module.matieres.find(m => m.id === matiereId);
    return matiere ? matiere.heures : 0;
  }
}