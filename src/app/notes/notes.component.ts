import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import * as pdfjsLib from 'pdfjs-dist';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  @ViewChild('notesFileInput') notesFileInput!: ElementRef;

  private readonly PDFJS_VERSION = '3.4.120';
  private readonly PDFJS_CDN_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${this.PDFJS_VERSION}`;

  students: any[] = [];

  selectedMatiere = '';
  selectedTypeDevoir = '';
  selectedSession = '';
  selectedModule = '';
  selectedSemestre = '';
  selectedSection = '';

  sessions = ['Principal', 'Rattrapage'];
  semestres = ['Semestre 1', 'Semestre 2'];
  sections = ['Informatique', 'Gsil', 'Infotronique', 'Mécatronique'];
  modules = ['Maths', 'Sécurité', 'Programmation', 'Réseaux', 'Base de données'];
  matieres = ['Maths', 'Sécurité', 'Programmation', 'Réseaux', 'Base de données'];

  uploadStatus = '';
  errorMessage = '';
  notesFileName = '';
  isProcessing = false;

  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `${this.PDFJS_CDN_URL}/pdf.worker.min.js`;
  }

  triggerNotesFileInput(): void {
    this.notesFileInput.nativeElement.click();
  }

  isExamen(): boolean {
    return this.selectedTypeDevoir === 'Examen';
  }

  async onNotesFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.resetImportState();
    this.isProcessing = true;
    this.notesFileName = file.name;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
        cMapUrl: `${this.PDFJS_CDN_URL}/cmaps/`,
        cMapPacked: true
      });

      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();

      const text = this.extractTextFromPDF(textContent.items as TextItem[]);
      this.parseStudentData(text);

      this.uploadStatus = `${this.students.length} étudiants importés`;
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isProcessing = false;
      input.value = '';
    }
  }

  private extractTextFromPDF(items: TextItem[]): string {
    return items
      .filter((item): item is TextItem => 'str' in item)
      .map(item => item.str)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private parseStudentData(text: string): void {
    const lines = text.split(/(?=\d{1,2} \d{8} )/g) // split avant chaque début d'étudiant
      .map(line => line.trim())
      .filter(line => line.length > 0);
  
    this.students = [];
  
    lines.forEach(line => {
      const parts = line.split(' ');
      if (this.selectedTypeDevoir === 'Examen') {
        // Format Examen : num cin nom prenom note lien
        if (parts.length >= 6) {
          const num = parseInt(parts[0]);
          const cin = parts[1];
          const nom = this.formatName(parts[2]);
          const prenom = this.formatName(parts[3]);
          const note = parseFloat(parts[4].replace(',', '.'));
          const link = parts.slice(5).join(' '); // tout ce qui suit est le lien
  
          this.students.push({
            num,
            cin,
            nom,
            prenom,
            note,
            examPdfLink: link
          });
        }
      } else if (this.selectedTypeDevoir === 'DS') {
        // Format DS : num cin nom prenom note
        if (parts.length >= 5) {
          const num = parseInt(parts[0]);
          const cin = parts[1];
          const nom = this.formatName(parts[2]);
          const prenom = this.formatName(parts[3]);
          const note = parseFloat(parts[4].replace(',', '.'));
  
          this.students.push({
            num,
            cin,
            nom,
            prenom,
            note,
            examPdfLink: '' // pas de lien pour DS
          });
        }
      }
    });
  
    if (this.students.length === 0) {
      throw new Error('Aucune donnée étudiante valide trouvée.');
    }
  }
  
  private formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  private resetImportState(): void {
    this.students = [];
    this.uploadStatus = '';
    this.errorMessage = '';
  }

  resetTable() {
    this.students = [];
    this.uploadStatus = '';
  }
  
  

  private handleError(error: any): void {
    console.error(error);
    this.errorMessage = 'Erreur lors de l\'importation. Vérifiez le format du fichier.';
  }

  onTypeDevoirChange(): void {
    if (this.selectedTypeDevoir !== 'Examen') {
      this.students = this.students.map(student => ({
        ...student,
        examPdfLink: '' // Vider les liens
      }));
    }
  }

  downloadExam(student: any): void {
    if (student.examPdfLink) {
      window.open(student.examPdfLink, '_blank');
    }
  }
}
