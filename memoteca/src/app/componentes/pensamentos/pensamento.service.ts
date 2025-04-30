import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos'

  constructor(private http: HttpClient) { }

  listar(pagina:number,filtro:string, favoritos:boolean): Observable<Pensamento[]> {
    const intensPorPagina= 6;
    let params = new HttpParams()
    .set("_page",pagina)
    .set("_limit",intensPorPagina)
    if(filtro.trim().length>2) {  //remove os espaços vazios
      //q -> vem de query para filtrar por texto
      params = params.set("q",filtro)
    }
    if(favoritos){
      params = params.set("favorito",true);
    }
    return this.http.get<Pensamento[]>(this.API,{params:params})
  }
  // listarPensamentosFavoritos(pagina:number,filtro:string):Observable<Pensamento[]>{
  //   const intensPorPagina= 6;
  //   let params = new HttpParams()
  //   .set("_page",pagina)
  //   .set("_limit",intensPorPagina)
  //   .set("favorito",true)
  //   if(filtro.trim().length>2) {
  //     params = params.set("q",filtro)
  //   }
  //   return this.http.get<Pensamento[]>(this.API,{params:params})
  // }
  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento)
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento )

  }
  mudarFavorito(pensamento:Pensamento): Observable<Pensamento>{
    pensamento.favorito = !pensamento.favorito
    return this.editar(pensamento)
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url)
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }

}
