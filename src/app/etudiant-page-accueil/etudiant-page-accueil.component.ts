import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { HeaderComponent } from '../header/header.component';
import { CardComponent } from '../card/card.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-etudiant-page-accueil',
  standalone: true,
  imports: [SideBarComponent, HeaderComponent, CardComponent,RouterOutlet],
  templateUrl: './etudiant-page-accueil.component.html',
  styleUrls: ['./etudiant-page-accueil.component.scss']
})
export class EtudiantPageAccueilComponent { }
