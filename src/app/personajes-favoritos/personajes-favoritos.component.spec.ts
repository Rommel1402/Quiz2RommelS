import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajesFavoritosComponent } from './personajes-favoritos.component';

describe('PersonajesFavoritosComponent', () => {
  let component: PersonajesFavoritosComponent;
  let fixture: ComponentFixture<PersonajesFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonajesFavoritosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonajesFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
