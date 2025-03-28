import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  imports: [CommonModule]
})
export class StudentListComponent implements OnInit {
onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}
  students = [
    { cin: '12345678', nom: 'Ziri', prenom: 'eya', email: 'eyaziri2@gmail.com', section: 'Informatique', niveau: '3ème année' },
    { cin: '87654321', nom: 'Zakraoui', prenom: 'Ameni', email: 'ameni123@gmail.com', section: 'Gsil', niveau: '2ème année' },
    { cin: '11223344', nom: 'Goutali', prenom: 'rim', email: 'rim@gmail.com', section: 'Infotronique', niveau: '1ère année' },
    { cin: '44556677', nom: 'Chelly', prenom: 'oumayma', email: 'ouma@gmail.com', section: 'Mécatronique', niveau: '2ème année' },
    { cin: '12345678', nom: 'yermeni', prenom: 'zounaikha', email: 'nina@gmail.com', section: 'Mécatronique', niveau: '1ère année' },
    { cin: '58741236', nom: 'messaadi', prenom: 'ouday', email: 'ouday@gmail.com', section: 'Informatique', niveau: '2ème année' },
  ];

  filteredStudents = [...this.students];
  document: any;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.selectedSection$.subscribe(section => {
      this.filterStudents(section, null);
    });

    this.studentService.selectedNiveau$.subscribe(niveau => {
      this.filterStudents(null, niveau);
    });
  }

  filterStudents(section: string | null, niveau: string | null) {
    this.filteredStudents = this.students.filter(student =>
      (!section || student.section === section) &&
      (!niveau || student.niveau === niveau)
    );
  }

  /*onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(`Fichier sélectionné : ${file.name}`);
      // → Appeler une fonction pour lire et traiter le fichier PDF
      this.readPDF(file);
    }
  }

  readPDF(file: File) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      const loadingTask = pdfjsLib.getDocument({ data: typedArray });
      
      const pdf = await loadingTask.promise;
      let extractedText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        textContent.items.forEach((item: any) => {
          extractedText += item.str + ' ';
        });
      }
  
      console.log('Contenu extrait :', extractedText);
      this.parsePDFData(extractedText);
    };
    
    reader.readAsArrayBuffer(file);
  }
  
  parsePDFData(data: string) {
    const rows = data.split('\n').map(row => row.trim()).filter(row => row);
  
    rows.forEach(row => {
      const [cin, nom, prenom, email, section, niveau] = row.split(/\s+/);
  
      if (cin && nom && prenom && email && section && niveau) {
        this.filteredStudents.push({ cin, nom, prenom, email, section, niveau });
      }
    });
  
    console.log('Liste mise à jour :', this.filteredStudents);
  }
  
}*/}