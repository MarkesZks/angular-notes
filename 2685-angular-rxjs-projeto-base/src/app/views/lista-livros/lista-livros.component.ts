
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy  {
  listaLivros: [];
  campoBusca: string = '';
  subscription: Subscription

  constructor(private livrosService:LivroService) {}



  buscarLivros(){
  //Observer, o qual representa a ideia de uma coleção de callbacks. Ele consegue ouvir os valores entregues pelo Observable.
  this.subscription = this.livrosService.buscar(this.campoBusca).subscribe({
    next: retornoApi => console.log(retornoApi),
    error: erro => console.error(erro), // Erro encerra o ciclo de vida assim não executando Complete
    complete: ()=> console.log('Observable Completado') // ela não tras nenhum dado apenas completa o ciclo de vida
  }  )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe() // Apenas encerra o observable
  }
}




