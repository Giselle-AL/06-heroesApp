import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
//para ejecutar apenas esté listo, se usa el Implements OnInit
export class HeroPageComponent implements OnInit{
public hero?: Hero;
  //con el constructor se inyectan los servicios
  constructor(
    private heroesService:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    //leer el url, usando un servicio del router
    this.activatedRoute.params
    .pipe(
      //propiedad local que permite retrasar la ejecución del código
      delay(1000),
      //nos permite tomar los params, destructurarlo y tomar el id
      switchMap( ({id}) => this.heroesService.getHeroById(id))
    ).subscribe(
      hero => {
      if(!hero) return this.router.navigate(['/heroes/list']);

      this.hero = hero;
      return;
    });
    }

    goBack():void{
      this.router.navigateByUrl('/heroes/list');
    }

  }
