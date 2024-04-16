import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {
  //reactive form module, usar cada que necesitemos implementar un formulario
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];

  //Para usar un servicio hay que inyectarlo en el constructor
  constructor(private heroesService:HeroesService) { }

    searchHero(){
    const value:string = this.searchInput.value||'';
      this.heroesService.getSuggestions(value)
      //la variable de heroes se iguala a la respuesta del servicio
      .subscribe(heroes => this.heroes = heroes);

    }

}
