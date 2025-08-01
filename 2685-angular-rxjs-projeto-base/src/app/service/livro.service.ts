import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Item, LivrosResultado } from '../models/interfaces';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  constructor(private http:HttpClient) { }

  private readonly API = "https://www.googleapis.com/books/v1/volumes"

  //Observable, o qual representa a ideia de uma coleção de valores ou eventos futuros;

  buscar(valorDigitado:string): Observable<Item[]> {
    //O método append é utilizado para adicionar um novo parâmetro à instância de HttpParams que acabamos de criar.
    const params = new HttpParams().append('q',valorDigitado)
    return this.http.get<LivrosResultado>(this.API,{params}).pipe(
      tap((retornoApi)=> console.log('FLuxo do TAP',retornoApi)),
      map(resultado => resultado.items),
      tap(resultado => console.log("Fluxo após o map",resultado))
    )


  }
}
