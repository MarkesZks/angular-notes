import { ListaDeCompraService } from './service/lista-de-compra.service';
import { Item } from 'src/app/interfaces/iItem';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-lista-de-compras';
  listaDeCompra : Array<Item> = [];

  constructor(private listaService: ListaDeCompraService) { }
  ngOnInit(): void {
     this.listaDeCompra = this.listaService.getListaDeCompra();
}
editarItem(item:Item){
  console.log('Editing item:', item);
}

}
