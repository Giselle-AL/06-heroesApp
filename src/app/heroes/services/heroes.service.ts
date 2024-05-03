import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of , map} from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined>  {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      //el of es un observable que emite un valor y luego se completa, de lo contrario marcaría un error
      catchError( error => of(undefined) )
    );
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
        .pipe(
            map (heroes => heroes.filter(hero => hero.superhero.toLowerCase().includes(query.toLowerCase())))
        );
  }
// Todo: Estos son los Endpoints (Puntos finales, a los que debemos acceder para hacer las peticiones)
  addHero(hero: Hero): Observable<Hero> {
    //el post recibe la url y el objeto a enviar
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    //si el id no existe, se lanza un error, no se puede mandar actyualizar sin verificar que existe el id
    if(!hero.id) throw Error('Hero is required');
    //el patch actualiza parcialmente el objeto, la url es el endpoint que gestiona la base de datos
    // después de la coma va el objeto con la información a actualizar
    //también se agrega el Id del objeto a actualizar
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(id:string): Observable<boolean> {
    //
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      // si sale un error entra en el catchError
      catchError(err => of (false)),
      //si es exitoso, se regresa un True, lo que sivgnifica que se eliminó el objeto
      map(resp=>true)
    );

  }

}
