import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantPageAccueilComponent } from './etudiant-page-accueil.component';

describe('EtudiantPageAccueilComponent', () => {
  let component: EtudiantPageAccueilComponent;
  let fixture: ComponentFixture<EtudiantPageAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantPageAccueilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantPageAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
