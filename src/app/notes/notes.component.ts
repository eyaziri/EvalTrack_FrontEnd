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
  @ViewChild('examsFileInput') examsFileInput!: ElementRef;

  // Configuration PDF.js
  private readonly PDFJS_VERSION = '3.4.120';
  private readonly PDFJS_CDN_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${this.PDFJS_VERSION}`;

  // Données des étudiants
  students: any[] = [];
  
  // Filtres
  selectedMatiere = '';
  selectedTypeDevoir = '';
  selectedSession = '';
  selectedModule = '';
  selectedSemestre = '';
  selectedSection = '';
  
  // Options des filtres
  sessions = ['Principal', 'Rattrapage'];
  semestres = ['Semestre 1', 'Semestre 2'];
  sections = ['Informatique', 'Gsil', 'Infotronique', 'Mécatronique'];
  modules = ['Maths', 'Sécurité', 'Programmation', 'Réseaux', 'Base de données'];
  matieres = ['Maths', 'Sécurité', 'Programmation', 'Réseaux', 'Base de données'];

  // États
  uploadStatus = '';
  errorMessage = '';
  notesFileName = '';
  isProcessing = false;

  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `${this.PDFJS_CDN_URL}/pdf.worker.min.js`;
  }

  // Déclencheurs pour les inputs files
  triggerNotesFileInput(): void {
    this.notesFileInput.nativeElement.click();
  }

  triggerExamsFileInput(): void {
    this.examsFileInput.nativeElement.click();
  }

  // Import du PDF de notes
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

  // Extraction du texte PDF
  private extractTextFromPDF(items: TextItem[]): string {
    return items
      .filter((item): item is TextItem => 'str' in item)
      .map(item => item.str)
      .join('\n')  // Joint avec sauts de ligne
      .replace(/\n+/g, '\n') // Normalise les sauts de ligne
      .trim();
  }

  // Analyse des données étudiants
  private parseStudentData(text: string): void {
    const lines = text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && !this.isHeaderLine(line));

    this.students = [];
    
    lines.forEach(line => {
      const studentData = this.parseStudentLine(line);
      if (studentData) {
        this.students.push(studentData);
      }
    });

    if (this.students.length === 0) {
      console.error('Texte analysé:', text);
      throw new Error('Aucune donnée étudiante valide trouvée. Vérifiez le format du PDF.');
    }
  }

  private isHeaderLine(line: string): boolean {
    return line.match(/N°|CIN|Nom|Prénom|Note|=====/i) !== null;
  }

  private parseStudentLine(line: string): any {
    const parts = line.split(/\s+/).filter(part => part.trim() !== '');
    
    // Format 1: Num CIN Nom Prénom Note
    if (parts.length >= 5) {
      return {
        num: parseInt(parts[0]),
        cin: parts[1],
        nom: this.formatName(parts[2]),
        prenom: this.formatName(parts[3]),
        note: parseFloat(parts[4].replace(',', '.')),
        examPdf: null,
        examPdfName: ''
      };
    }
    // Format 2: CIN Nom Prénom Note (sans numéro)
    else if (parts.length === 4) {
      return {
        num: this.students.length + 1,
        cin: parts[0],
        nom: this.formatName(parts[1]),
        prenom: this.formatName(parts[2]),
        note: parseFloat(parts[3].replace(',', '.')),
        examPdf: null,
        examPdfName: ''
      };
    }

    console.warn('Ligne ignorée:', line);
    return null;
  }

  // Formatage des noms
  private formatName(name: string): string {
    return name.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private resetImportState(): void {
    this.students = [];
    this.errorMessage = '';
    this.uploadStatus = '';
  }

  private handleError(error: unknown): void {
    console.error('Erreur:', error);
    this.errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
  }

  // Gestion des examens
  onExamsFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
      if (index < this.students.length) {
        this.students[index].examPdf = file;
        this.students[index].examPdfName = file.name;
      }
    });

    this.uploadStatus = `${files.length} examens associés`;
    input.value = '';
  }

  isExamen(): boolean {
    return this.selectedTypeDevoir === 'Examen';
  }

  downloadExam(student: any): void {
    if (!student.examPdf) return;
    
    const url = URL.createObjectURL(student.examPdf);
    const a = document.createElement('a');
    a.href = url;
    a.download = student.examPdfName || 'examen.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}