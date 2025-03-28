import { Component } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { HeaderStandardComponent } from "../header-standard/header-standard.component";
import { ContentDashboardComponent } from "../content-dashboard/content-dashboard.component";
import { NotesTableComponent } from "../notes-table/notes-table.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-etudiant-page-dashboard',
  imports: [SideBarComponent, HeaderStandardComponent, ContentDashboardComponent, NotesTableComponent],
  templateUrl: './etudiant-page-dashboard.component.html',
  styleUrl: './etudiant-page-dashboard.component.scss'
})
export class EtudiantPageDashboardComponent {

}
