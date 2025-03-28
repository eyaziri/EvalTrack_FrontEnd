import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  // Observable pour la sélection des filtres
  private selectedSection = new BehaviorSubject<string | null>(null);
  private selectedNiveau = new BehaviorSubject<string | null>(null);

  // Permet de lire les valeurs sélectionnées
  selectedSection$ = this.selectedSection.asObservable();
  selectedNiveau$ = this.selectedNiveau.asObservable();

  // Fonction pour mettre à jour la section sélectionnée
  setSelectedSection(section: string) {
    this.selectedSection.next(section);
  }

  // Fonction pour mettre à jour le niveau sélectionné
  setSelectedNiveau(niveau: string) {
    this.selectedNiveau.next(niveau);
  }
}
