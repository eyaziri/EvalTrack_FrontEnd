import { Component } from '@angular/core';
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";
import { HeaderStandardComponent } from "../header-standard/header-standard.component";
import { NotesComponent } from "../notes/notes.component";

@Component({
  selector: 'app-admin-page-notes',
  imports: [SideBarAdminComponent, HeaderStandardComponent, NotesComponent],
  templateUrl: './admin-page-notes.component.html',
  styleUrl: './admin-page-notes.component.scss'
})
export class AdminPageNotesComponent {

}
