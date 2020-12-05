import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSearch(value: string) {
    console.log('Buscar--->', value);
    //ESTO DE ABAJO QUIERE DECIR QUE A PARTIR DEL CARACTER 4 ES QUE ENVIARA LAS PETICIONES A LA API
    if (value && value.length > 3) {
      this.router.navigate(['/character-list'], { queryParams: { q: value } });
    }
}
}
