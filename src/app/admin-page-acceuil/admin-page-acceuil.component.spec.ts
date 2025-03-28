import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageAcceuilComponent } from './admin-page-acceuil.component';

describe('AdminPageAcceuilComponent', () => {
  let component: AdminPageAcceuilComponent;
  let fixture: ComponentFixture<AdminPageAcceuilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPageAcceuilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageAcceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
