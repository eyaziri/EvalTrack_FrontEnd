import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Matiere {
  matiereId?: number;
  nom: string;
  coefficient: number;
  description: string;
  ponderation: string;
  moyenne: number;
}
@Injectable({
  providedIn: 'root'
})
export class MatiéreService {

  constructor() { }

  getMatieres(idModule: number): Observable<any[]> {
    const apiUrl = `http://localhost:8080/EvalTrack/matieres/module/${idModule}`;
    return new Observable((observer) => {
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa('admin:123'), 
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        observer.next(data);
        observer.complete();  // <-- à ajouter
      })
      .catch(error => observer.error(error));
    });
  }

  addMatiere(matiere: Omit<Matiere, 'idMatiere'>): Observable<Matiere> {
    const apiUrl = 'http://localhost:8080/EvalTrack/matieres';

    return new Observable((observer) => {
      fetch(apiUrl, {
        method: 'POST',
        headers:  {
          'Authorization': 'Basic ' + btoa('admin:123'), 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(matiere)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  addMatiereToModule(matiere: any,idModule:number): Observable<any> {
    return new Observable((observer) => {
      fetch(`http://localhost:8080/EvalTrack/matieres/for-module/${idModule}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('admin:123'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(matiere) 
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      })
      .then(data => observer.next(data))
      .catch(error => observer.error(error));
    });
  }
}
