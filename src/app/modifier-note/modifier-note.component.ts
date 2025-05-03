import { Component } from '@angular/core';
import { SideBarAdminComponent } from '../side-bar-admin/side-bar-admin.component';
import { HeaderComponent } from '../header/header.component';
import { FormulaireNoteComponent } from '../formulaire-note/formulaire-note.component';

@Component({
  selector: 'app-modifier-note',
  imports: [SideBarAdminComponent,HeaderComponent,FormulaireNoteComponent],
  templateUrl: './modifier-note.component.html',
  styleUrl: './modifier-note.component.scss'
})
export class ModifierNoteComponent {

}
