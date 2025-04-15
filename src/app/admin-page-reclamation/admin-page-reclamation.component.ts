import { Component } from '@angular/core';
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";
import { HeaderStandardComponent } from "../header-standard/header-standard.component";
import { TableauReclamationComponent } from "../tableau-reclamation/tableau-reclamation.component";

@Component({
  selector: 'app-admin-page-reclamation',
  imports: [SideBarAdminComponent, HeaderStandardComponent, TableauReclamationComponent],
  templateUrl: './admin-page-reclamation.component.html',
  styleUrl: './admin-page-reclamation.component.scss'
})
export class AdminPageReclamationComponent {

}
