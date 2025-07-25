import { ListaDeCompraService } from './service/lista-de-compra.service';
import { Item } from 'src/app/interfaces/iItem';
import { Component, DoCheck, OnChanges, OnDestroy, OnInit,  SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck,OnDestroy {
  title = 'app-lista-de-compras';
  listaDeCompra : Array<Item> = [];
  itemParaSerEditado! : Item;

  constructor(private listaService: ListaDeCompraService) { }
  ngOnInit(): void {
     this.listaDeCompra = this.listaService.getListaDeCompra();
  }
  ngDoCheck(): void {
    this.listaService.atualizarLista()
  }
  ngOnDestroy(): void {

  }

editarItem(item:Item){
  this.itemParaSerEditado = item
}
checarItem(item:Item){
   this.listaService.removerItem(item.id)
}
deletarItem(id:number){
  const index = this.listaDeCompra.findIndex((item)=>item.id === id);
  //deletar item, passando o index e a quantidade
  this.listaDeCompra.splice(index,1);
}
limparLista(){
   this.listaDeCompra = [];
}

}
