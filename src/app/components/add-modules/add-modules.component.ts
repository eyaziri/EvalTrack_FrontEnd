import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../../Services/module.service';
import { MatiéreService } from '../../../Services/matiére.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Module } from '../../types';
import { SectionServiceService } from '../../../Services/section-service.service';




interface Filiere {
  id: number;
  nom: string;
}

interface Matiere {
  idMatiere?: number;
  nom: string;
  coefficient: number;
  description: string;
  ponderation: string;
  moyenne:number;
}

/*// Dans votre interface Module
 interface Module {
  idModule: number;
  nomModule: string;
  moyenne: number;
  semestre: number;
  coefModule: number;
  section: { idSection: number };
  matieres: Matiere[]; // Changé de listeMatieres à matieres
}*/



interface NewModuleForm {
  nom: string;
  nbMatieres: number;
  matieres: Matiere[];
  coefModule: number;
}

@Component({
  selector: 'app-add-modules',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './add-modules.component.html',
  styleUrls: ['./add-modules.component.scss']
})
export class AddModulesComponent implements OnInit {
  sections: any[] = []
  modules: any[] = []
   idModule=0;
   idSection=0;
   Semestre=0;
   successMessage: string = '';
   errorMessage = '';
  semestres = ['Semestre 1', 'Semestre 2', 'Semestre 3', 'Semestre 4', 'Semestre 5'];
  
  selectedFiliere: any = this.sections[0];
  selectedSemestre: string = this.semestres[0];
  
  successMessages = {
    add: '',
    edit: '',
    delete: ''
  };
  
  errorMessages = {
    add: '',
    edit: '', 
    delete: ''
  };

  currentView: 'main' | 'add' | 'edit' | 'delete' = 'main';
  actionType: 'addModule' | 'addMatiere' | 'editModule' | 'editMatiere' | 'deleteModule' | 'deleteMatiere' | null = null;
  existingModules: Module[] = [];
  matieresForEdit: Matiere[] = [];
  
  newModule: NewModuleForm = {
    nom: '',
    nbMatieres: 1,
    matieres: [],
    coefModule: 0
  };
  onModuleNameChange(): void {
    // Vous pouvez ajouter ici une logique de validation si nécessaire
    console.log('Nom du module modifié:', this.moduleToEdit?.nomModule);
  }

  loadMatieresForDelete(): void {
    if (!this.selectedModuleForMatiereDelete) {
      this.selectedMatiereToDelete = null;
      return;
    }
    const module = this.existingModules.find(m => m.idModule === this.selectedModuleForMatiereDelete);
    this.matieresForEdit = module ? [...module.matieres ] : [];
  }
  
  // Fonction pour obtenir les matières pour la suppression
  getMatieresForDelete(moduleId: number): Matiere[] {
    const module = this.existingModules.find(m => m.idModule === moduleId);
    return module ? module.matieres  : [];
  }
  
  // Fonction pour charger les détails d'une matière pour la suppression
  loadMatiereDetails(): void {
    // Cette fonction est appelée lors de la sélection d'une matière à supprimer
    // Vous pouvez ajouter des logs pour le débogage si nécessaire
    console.log('Matière sélectionnée pour suppression:', this.selectedMatiereToDelete);
  }
  selectedModuleForMatiere: number =0;
  newMatiere: Omit<Matiere, 'idMatiere'> = { 
    nom: '', 
    coefficient: 1, 
    description: '', 
    ponderation: 'Examen',
    moyenne:0
  };
  
  selectedModuleToEdit: number | null = null;
  moduleToEdit: Partial<Module> | null = null;
  
  selectedModuleForMatiereEdit: number | null = null;
  selectedMatiereToEdit: number | null = null;
  matiereToEdit: Partial<Matiere> | null = null;
  
  selectedModuleToDelete: number | null = null;
  selectedModuleForMatiereDelete: number | null = null;
  selectedMatiereToDelete: number | null = null;
  moduleDetails: Module | null = null;

  constructor(
    private moduleService: ModuleService,
    private matiéreService: MatiéreService,
    private sectionService :SectionServiceService
  ) {
    this.initNewMatieres();
  }

  ngOnInit(): void {
   
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
  onModuleChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;

    if (target) {
      const selectedModuleForMatiere = target.value;
    
      this.idModule = parseInt( selectedModuleForMatiere);
    }
  }
  onSectionChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;

    if (target) {
      const selectedSection = target.value;
    
      this.idSection = parseInt( selectedSection);
    }
  }
  onSemestreChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;

    if (target) {
      const lastChar = this.selectedSemestre.slice(-1);
       this.Semestre = parseInt(lastChar);
  }
  }
 
  AddMatiereToModule() {
    if (!this.isNewMatiereValid()) return;
  
    const matiereToSend = {
      nom: this.newMatiere.nom,
      coefficient: this.newMatiere.coefficient,
      description: this.newMatiere.description,
      ponderation: this.newMatiere.ponderation,
      moyenne: this.newMatiere.moyenne,
      module: { idModule: this.idModule }
    };
  
    this.matiéreService.addMatiereToModule(matiereToSend, this.idModule).subscribe({
      next: (data) => {
        this.successMessage = `La matière "${this.newMatiere.nom}" a été ajoutée avec succès au module !`;
        this.resetForms();
        this.actionType = null; // Retour aux options d'ajout
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: (err) => {
        console.error('Error adding matiere:', err);
        this.errorMessage = "Erreur lors de l'ajout de la matière: " + (err.error?.message || err.message);
        setTimeout(() => this.errorMessage = '', 8000);
      }
    });
  }

  // ========== UTILITY METHODS ==========
  calculateTotalCoefficient(matieres: Matiere[]): number {
    return matieres.reduce((sum, matiere) => sum + (matiere.coefficient || 0), 0);
  }

  updateModuleCoefficient(): void {
    this.newModule.coefModule = this.calculateTotalCoefficient(this.newModule.matieres);
  }

 

  loadModuleToEdit(): void {
    if (!this.selectedModuleToEdit) {
      this.moduleToEdit = null;
      return;
    }

    const module = this.existingModules.find(m => m.idModule === this.selectedModuleToEdit);
    this.moduleToEdit = module ? { ...module } : null;
  }

  loadMatieresForEdit(): void {
    if (!this.selectedModuleForMatiereEdit) {
      this.matieresForEdit = [];
      return;
    }

    const module = this.existingModules.find(m => m.idModule === this.selectedModuleForMatiereEdit);
    this.matieresForEdit = module ? [...module.matieres ] : [];
    this.selectedMatiereToEdit = null;
    this.matiereToEdit = null;
  }

  loadMatiereToEdit(): void {
    if (!this.selectedMatiereToEdit || !this.selectedModuleForMatiereEdit) {
      this.matiereToEdit = null;
      return;
    }

    const module = this.existingModules.find(m => m.idModule === this.selectedModuleForMatiereEdit);
    const matiere = module?.matieres .find(m => m.idMatiere === this.selectedMatiereToEdit);
    this.matiereToEdit = matiere ? { ...matiere } : null;
  }

  loadModuleDetails(): void {
    if (!this.selectedModuleToDelete) {
      this.moduleDetails = null;
      return;
    }
  
    this.moduleService.getModuleMatiere(this.idSection, this.Semestre).subscribe({
      next: (modules) => {
        const module = modules.find(m => m.idModule === this.selectedModuleToDelete);
        this.moduleDetails = module ? { ...module, matieres: module.listeMatieres || [] } : null;
      },
      error: (err) => console.error('Erreur lors du chargement des détails du module :', err)
    });
  }

  // ========== VIEW MANAGEMENT ==========
  switchView(view: 'main' | 'add' | 'edit' | 'delete'): void {
    this.currentView = view;
    this.successMessages = { add: '', edit: '', delete: '' };
    this.errorMessages = { add: '', edit: '', delete: '' };
    this.actionType = null;
    this.resetForms();
  }

  setActionType(type: 'addModule' | 'addMatiere' | 'editModule' | 'editMatiere' | 'deleteModule' | 'deleteMatiere'): void {
    this.actionType = type;
    this.resetForms(); // Réinitialiser les formulaires
    // Chargez les modules uniquement si nécessaire
    if (type === 'addMatiere' || type === 'editModule' || type === 'editMatiere' || type === 'deleteModule' || type === 'deleteMatiere') {
      this.moduleService.getModule(this.idSection, this.Semestre).subscribe({
        next: (data) => {
          if (Array.isArray(data)) {
            this.modules = data.map(module => ({
              idModule: module.idModule,
              nomModule: module.nomModule,
            }));
            this.existingModules = data; // Mettez à jour existingModules
          }
        },
        error: (err) => console.error('Error fetching modules:', err)
      });
    }
  }

  resetAction(): void {
    this.actionType = 'addModule';
    this.resetForms();
  }

  resetForms(): void {
    this.newModule = { nom: '', nbMatieres: 1, matieres: [], coefModule: 0 };
    this.initNewMatieres();
    this.newMatiere = { nom: '', coefficient: 1, description: '', ponderation: '0.35*DS+0.65Examen' ,moyenne: 0};
    this.moduleToEdit = null;
    this.matiereToEdit = null;
    this.selectedModuleToEdit = null;
    this.selectedModuleForMatiere = 0;
    this.selectedModuleToDelete = null;
    this.selectedModuleForMatiereDelete = null;
    this.selectedMatiereToDelete = null;
    this.moduleDetails = null;
  }

  initNewMatieres(): void {
    this.newModule.matieres = Array(this.newModule.nbMatieres).fill(0).map(() => ({
      nom: '',
      coefficient: 1,
      description: '',
      ponderation: '0.35*DS+0.65Examen',
      moyenne:0
    }));
    this.updateModuleCoefficient();
  }

  // ========== CRUD OPERATIONS ==========
  addNewModule(): void {
    if (!this.isNewModuleValid()) return;
  
    const semestreNumber = this.semestres.indexOf(this.selectedSemestre) + 1;
    
    // Créer l'objet module à envoyer
    const moduleToSend = {
      nomModule: this.newModule.nom,
      moyenne: 0,
      semestre: semestreNumber,
      coefModule: this.calculateTotalCoefficient(this.newModule.matieres),
      section: { idSection: this.idSection }
    };
  
    // Créer la liste des matières à envoyer
    const matieresToSend = this.newModule.matieres.map(matiere => ({
      nom: matiere.nom,
      coefficient: matiere.coefficient,
      description: matiere.description,
      ponderation: matiere.ponderation,
      moyenne: 0
    }));
  
    // Créer l'objet complet pour l'envoi
    const moduleWithMatieres = {
      module: moduleToSend,
      matieres: matieresToSend
    };
  
    this.moduleService.createModuleWithMatieres(moduleWithMatieres).subscribe({
      next: () => {
        this.successMessage = 'Module et matières ajoutés avec succès!';
        this.resetForms();
        this.actionType = null; // Retour aux options d'ajout
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.errorMessage = "Erreur lors de l'ajout du module et des matières";
        setTimeout(() => this.errorMessage = '', 8000);
      }
    });
  }

  addNewMatiere(): void {
    if (!this.isNewMatiereValid()) return;

    const matiereToSend = {
      ...this.newMatiere,
      module: { idModule: this.selectedModuleForMatiere }
    };

    this.matiéreService.addMatiere(matiereToSend).subscribe({
      next: () => this.handleSuccess('Matière ajoutée avec succès!'),
      error: (error: any) => this.handleError('Erreur lors de l\'ajout de la matière', error)
    });
  }

  saveModuleChanges(): void {
    if (!this.isModuleFormValid()) {
      alert('Veuillez remplir correctement le formulaire');
      return;
    }
  
    // Préparer seulement les champs nécessaires
    const moduleToUpdate = {
      nomModule: this.moduleToEdit?.nomModule?.trim(),
      semestre: this.moduleToEdit?.semestre,
      coefModule: this.calculateTotalCoefficient(this.moduleToEdit?.matieres || [])
    };
  
    console.log('Données envoyées:', moduleToUpdate); // Debug
  
    this.moduleService.updateModule(this.selectedModuleToEdit!, moduleToUpdate)
      .subscribe({
        next: () => {
          this.successMessages.edit = "Module modifié avec succès";
          this.resetForms();
          this.actionType = null;
      this.errorMessages.edit = '';
      // Réinitialiser après un délai
      setTimeout(() => this.successMessages.edit = '', 5000);
    },
        error: (err) => {
          this.errorMessages.edit = "Erreur lors de la modification du module";
         }
      });
  }

  saveMatiereChanges(): void {
    if (!this.canSaveMatiere()) {
      alert('Veuillez remplir tous les champs correctement');
      return;
    }

    const matiereToUpdate: Partial<Matiere> = {
      nom: this.matiereToEdit?.nom,
      coefficient: this.matiereToEdit?.coefficient,
      description: this.matiereToEdit?.description,
      ponderation: this.matiereToEdit?.ponderation,
      moyenne: this.matiereToEdit?.moyenne
    };

    /*this.matiéreService.updateMatiere(this.selectedMatiereToEdit!, matiereToUpdate).subscribe({
      next: () => this.handleSuccess('Matière modifiée avec succès!'),
      error: (error: any) => this.handleError('Erreur lors de la modification de la matière', error)
    });*/
  }

  confirmDeleteModule(): void {
    if (!this.selectedModuleToDelete) return;

    this.moduleService.deleteModule(this.selectedModuleToDelete).subscribe({
      next: () => this.handleSuccess('Module supprimé avec succès!'),
      error: (error: any) => this.handleError('Erreur lors de la suppression du module', error)
    });
  }

  confirmDeleteMatiere(): void {
    if (!this.selectedMatiereToDelete) return;

   /* this.matiereService.deleteMatiere(this.selectedMatiereToDelete).subscribe({
      next: () => this.handleSuccess('Matière supprimée avec succès!'),
      error: (error: any) => this.handleError('Erreur lors de la suppression de la matière', error)
    });*/
  }

  // ========== VALIDATION METHODS ==========
  private isNewModuleValid(): boolean {
    if (!this.newModule.nom || this.newModule.matieres.some(m => !m.nom)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return false;
    }
    return true;
  }

  private isNewMatiereValid(): boolean {
    if (!this.selectedModuleForMatiere || !this.newMatiere.nom) {
      alert('Veuillez sélectionner un module et remplir le nom de la matière');
      return false;
    }
    return true;
  }

  public isModuleFormValid(): boolean {
    return !!this.selectedModuleToEdit && !!this.moduleToEdit?.nomModule?.trim();
  }

  canSaveMatiere(): boolean {
    return !!this.matiereToEdit?.nom?.trim() && 
           !!this.matiereToEdit?.coefficient &&
           !!this.matiereToEdit?.description &&
           !!this.matiereToEdit?.moyenne &&
           !!this.matiereToEdit?.ponderation &&
           !!this.selectedModuleForMatiereEdit &&
           !!this.selectedMatiereToEdit;
  }

  // ========== HELPER METHODS ==========
  private handleSuccess(message: string): void {
    alert(message);
   
    this.resetAction();
    this.switchView('main');
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    alert(message);
  }

  getMatieresForModule(moduleId: number): Matiere[] {
    const module = this.existingModules.find(m => m.idModule === moduleId);
    return module ? module.matieres  : [];
  }

  getModuleName(moduleId: number): string {
    const module = this.existingModules.find(m => m.idModule === moduleId);
    return module ? module.nomModule : 'Inconnu';
  }

  getMatiereName(matiereId: number | null): string {
    if (!matiereId || !this.selectedModuleForMatiereDelete) return 'Inconnu';
    const module = this.existingModules.find(m => m.idModule === this.selectedModuleForMatiereDelete);
    const matiere = module?.matieres .find(m => m.idMatiere === matiereId);
    return matiere ? matiere.nom : 'Inconnu';
  }

  getMatiereCoefficient(matiereId: number | null): number {
    if (!matiereId || !this.selectedModuleForMatiereDelete) return 0;
    const module = this.existingModules.find(m => m.idModule === this.selectedModuleForMatiereDelete);
    const matiere = module?.matieres .find(m => m.idMatiere === matiereId);
    return matiere ? matiere.coefficient : 0;
  }

  getMatiereDescription(matiereId: number | null): String {
    if (!matiereId || !this.selectedModuleForMatiereDelete) return '';
    const module = this.existingModules.find(m => m.idModule === this.selectedModuleForMatiereDelete);
    const matiere = module?.matieres .find(m => m.idMatiere === matiereId);
    return matiere ? matiere.description :'' ;
  }

  getMatiereMoyenne(matiereId: number | null): number {
    if (!matiereId || !this.selectedModuleForMatiereDelete) return 0;
    const module = this.existingModules.find(m => m.idModule === this.selectedModuleForMatiereDelete);
    const matiere = module?.matieres .find(m => m.idMatiere === matiereId);
    return matiere ? matiere.moyenne :0 ;
  }

  getMatierePonderation(matiereId: number | null): String {
    if (!matiereId || !this.selectedModuleForMatiereDelete) return '';
    const module = this.existingModules.find(m => m.idModule === this.selectedModuleForMatiereDelete);
    const matiere = module?.matieres .find(m => m.idMatiere === matiereId);
    return matiere ? matiere.ponderation :'' ;
  }
}