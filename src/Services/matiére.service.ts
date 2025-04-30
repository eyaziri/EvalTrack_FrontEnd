import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
