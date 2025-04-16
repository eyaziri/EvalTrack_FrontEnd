import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SectionServiceService {
  private apiUrl = 'http://localhost:8080/EvalTrack/sections';
  constructor() { }

  getSections(): Observable<any[]> {
    return new Observable((observer) => {
      fetch(this.apiUrl)
        .then(response => response.json())
        .then(data => observer.next(data))
        .catch(error => observer.error(error));
    });
  }
}
