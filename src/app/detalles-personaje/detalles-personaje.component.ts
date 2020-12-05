import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Personaje } from '../personaje';
import { PersonajesAPIService } from '../personajes-api.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalles-personaje',
  templateUrl: './detalles-personaje.component.html',
  styleUrls: ['./detalles-personaje.component.scss']
})
export class DetallesPersonajeComponent implements OnInit {
  character$: Observable<Personaje>;

  constructor(private route: ActivatedRoute,
    private characterService: PersonajesAPIService,
    private location: Location) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      const id = params['id'];
      this.character$ = this.characterService.getDetails(id);

    });

  }

  onGoBack(): void {
    this.location.back();
    window.history.back();
  }
}
