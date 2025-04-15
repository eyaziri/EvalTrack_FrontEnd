import { Component } from '@angular/core';
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";
import { HeaderStandardComponent } from "../header-standard/header-standard.component";
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-admin-page-acceuil',
  imports: [SideBarAdminComponent, HeaderStandardComponent, CardComponent],
  templateUrl: './admin-page-acceuil.component.html',
  styleUrl: './admin-page-acceuil.component.scss'
})
export class AdminPageAcceuilComponent {

}
