import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // <-- AJOUTER ÇA

@Component({
  selector: 'app-formulaire-note',
  imports: [ReactiveFormsModule ],
  templateUrl: './formulaire-note.component.html',
  styleUrl: './formulaire-note.component.scss'
})
export class FormulaireNoteComponent {
  noteForm!: FormGroup ;
  constructor(private fb: FormBuilder)
  {

  }
  ngOnInit(): void {
    this.noteForm = this.fb.group({
      session: ['', Validators.required],
      section: ['', Validators.required],
      semestre: ['', Validators.required],
      module: ['', Validators.required],
      matiere: ['', Validators.required],
      type_exam: ['', Validators.required],
      note: ['', [Validators.required, Validators.min(0), Validators.max(20)]]
    });
  }
  onSubmit(): void {
    if (this.noteForm.valid) {
      console.log('Données du formulaire :', this.noteForm.value);
      
    }
  }

}
