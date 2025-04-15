import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-tableau-reclamation',
  imports: [CommonModule],
  templateUrl: './tableau-reclamation.component.html',
  styleUrl: './tableau-reclamation.component.scss'
})
export class TableauReclamationComponent {

  personnes = [
    { numero: 1, cin: '12345678', description: 'Description 1', etat: true, mail: true },
    { numero: 2, cin: '87654321', description: 'Description 2', etat: false, mail: false },
    { numero: 3, cin: '45678912', description: 'Description 3', etat: true, mail: true },
  ];
}
