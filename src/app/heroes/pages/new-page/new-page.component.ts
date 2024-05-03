import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent  implements OnInit{

  //Formulario Reactivo
  public heroForm = new FormGroup(
    {
      id:               new FormControl(''),
      superhero:        new FormControl('',{nonNullable: true}),
      publisher:        new FormControl<Publisher>(Publisher.DCComics),
      alter_ego:        new FormControl(''),
      first_appearance: new FormControl(''),
      characters:       new FormControl(''),
      alt_img:          new FormControl(''),
    }
  );

  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ]

  constructor(
    private heroesService:HeroesService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private snackbar:MatSnackBar,
    private dialog:MatDialog) { }

  //Se estableccen Getters para los campos del formulario
  //De esta forma recibimos la información y la asignamos para hacer el registro o la actualización

  get currentHero():Hero{
    const hero= this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    //si el código no incluye la palabra edit, no se ejecuta el código
    if(!this.router.url.includes('edit')) return;
    //pero si lo incluye va a traer la info del héroes correspondiente
    this.activatedRoute.params  // para la ruta activa
    .pipe(
      //se manda llamar el método de getHeroById tomando el id de la url activa
      switchMap(({id})=>this.heroesService.getHeroById(id)),
    ).subscribe(hero=>{
      if(!hero) return this.router.navigateByUrl('/');

      this.heroForm.reset(hero);
      return;
    });
  }
  onSubmit():void{
    if(this.heroForm.invalid){
      return;
    }
    //this.heroesService.updateHero(this.heroForm.value)

    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      //los observable no se disparan si no nos subscribimos a ellos
      .subscribe( hero=>{

        this.showSnackbar(`${hero.superhero} actualizado`);

      });
      //Este return sirve para que en caso de entrar y finalizar este if
      //no se ejecute el siguiente bloque de código
      return;
    }

    this.heroesService.addHero(this.currentHero)
    .subscribe( hero=>{
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackbar(`${hero.superhero} se guardó`);
    });
    return;
  }

  onConfirmDelete():void{
    if(!this.currentHero.id) throw Error('Se requiere el ID del héroe');

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('The dialog was closed');
    });
    //TODO: No se ha conectado con el botón de borrar
  }

  showSnackbar(mesage:string):void{
    this.snackbar.open(mesage, 'Cerrar',
    {duration: 2500});
  }

}
