import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { SectionServiceService } from '../section-service.service';
@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  imports: [CommonModule,FormsModule]
})
export class StudentListComponent implements OnInit {
etudiants: any[] = [];
sections: any[] = [];
action: string = 'consulter';
selectedSemestre: string = '';
selectedSection: string = '';
semestres = ['Semestre 1', 'Semestre 2','Semestre 3','Semestre 4','Semestre 5'];

 

  constructor(private sectionS: SectionServiceService) {


  }

  ngOnInit() {
    this.sectionS.getSections().subscribe((data) => {
      this.sections = data;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file: File = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      data.shift(); // Enlever la ligne d'en-tête
      this.etudiants = data;
    };

    
    reader.readAsArrayBuffer(file);
  }


 }