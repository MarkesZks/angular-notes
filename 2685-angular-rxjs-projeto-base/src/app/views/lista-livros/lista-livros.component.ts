
import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent  {
  listaLivros: [];
  campoBusca: string = '';

  constructor(private livrosService:LivroService) {}


  buscarLivros(){
  //Observer, o qual representa a ideia de uma coleção de callbacks. Ele consegue ouvir os valores entregues pelo Observable.

  this.livrosService.buscar(this.campoBusca).subscribe(
    (response)=>console.log(response),
    (error) => console.log(error)
  )


  }
}



