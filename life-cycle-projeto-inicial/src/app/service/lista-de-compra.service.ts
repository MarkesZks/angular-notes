import { Item } from 'src/app/interfaces/iItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListaDeCompraService {
  private listaDeCompra: Item[] = [];

  constructor() {
    this.listaDeCompra = JSON.parse(localStorage.getItem('itens')|| '[]')
    console.log('Instanciando dependências necessárias para o serviço.');
  }

  getListaDeCompra() {
    return this.listaDeCompra;
  }

  criarItem(nomeDoItem: string) {
    const id = this.listaDeCompra.length + 1;
    const item: Item = {
      id: id,
      nome: nomeDoItem,
      data: new Date().toLocaleDateString('pt-BR'),
      comprado: false,
    };
    return item;
  }
  adicionarItemNaListe(nomeDoItem: string) {
    const item = this.criarItem(nomeDoItem);
    this.listaDeCompra.push(item);
    //this.atualizarLista()
  }
  editarItemDaLista(itemAntigo: Item, nomeEditadoDoItem: string) {
    const itemEditado: Item = {
      id: itemAntigo.id,
      nome: nomeEditadoDoItem,
      data: new Date().toLocaleDateString('pt-BR'),
      comprado: itemAntigo.comprado,

    };
    const id = itemAntigo.id;
    this.listaDeCompra.splice(Number(id) - 1, 1, itemEditado);

  }
  removerItem(id?: number|string): void {
    this.listaDeCompra = this.listaDeCompra.filter((item) => item.id !== id);
     localStorage.removeItem('itens');
  }

  atualizarLista(){
    localStorage.setItem('itens',JSON.stringify(this.listaDeCompra));
  }

}
