import { Item, VolumeInfo } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: Livro[];
  campoBusca: string = '';
  subscription: Subscription;
  livro: Livro;
  constructor(private livrosService: LivroService) {}

  buscarLivros() {
    //Observer, o qual representa a ideia de uma coleção de callbacks. Ele consegue ouvir os valores entregues pelo Observable.
    this.subscription = this.livrosService.buscar(this.campoBusca).subscribe({
      next: (items) => {
      this.listaLivros = this.livrosResultadoParaLivros(items)
      },
      error: (erro) => console.error(erro) // Erro encerra o ciclo de vida assim não executando Complete
      // complete: () => console.log('Observable Completado'), // ela não tras nenhum dado apenas completa o ciclo de vida
    });
  }
  livrosResultadoParaLivros(items: Item[]):LivroVolumeInfo[] {

    return items.map(item =>{
      return new LivroVolumeInfo(item)
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Apenas encerra o observable
  }
}
