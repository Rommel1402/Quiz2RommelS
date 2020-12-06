import { TestBed } from '@angular/core/testing';

import { PersonajesAPIService } from './personajes-api.service';

describe('PersonajesAPIService', () => {
  let service: PersonajesAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonajesAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
