import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'hero-card',
  templateUrl: 'card.component.html'
})

export class CardComponent implements OnInit{
  @Input()
  public hero!:Hero;

  ngOnInit(): void {
    if (!this.hero) throw new Error('Hero property is required');
  }

  sendID(id:string):void{
    this.heroesService.getHeroById(id).subscribe((hero) => {
      console.log(hero);
    });
  }


  constructor(private heroesService: HeroesService) {}
}
