export interface Matiere {
  idMatiere?: number;
  nom: string;
  coefficient: number;
  description: string;
  ponderation: string;
  moyenne: number;
  
}

export interface Module {
  idModule?: number;
  nomModule: string;
  moyenne: number;
  semestre: number;
  coefModule: number;
  section: { idSection: number };
  matieres : Matiere[];
}

export interface NewModuleForm {
  nom: string;
  nbMatieres: number;
  matieres: Matiere[];
  coefModule: number;
}