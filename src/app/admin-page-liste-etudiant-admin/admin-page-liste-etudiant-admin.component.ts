import { Component } from '@angular/core';
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";
import { HeaderStandardComponent } from "../header-standard/header-standard.component";
import { StudentListComponent } from "../student-list/student-list.component";

@Component({
  selector: 'app-admin-page-liste-etudiant-admin',
  imports: [SideBarAdminComponent, HeaderStandardComponent, StudentListComponent],
  templateUrl: './admin-page-liste-etudiant-admin.component.html',
  styleUrl: './admin-page-liste-etudiant-admin.component.scss'
})
export class AdminPageListeEtudiantAdminComponent {

}
