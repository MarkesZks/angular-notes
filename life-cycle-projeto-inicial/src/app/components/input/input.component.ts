import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit , OnChanges, DoCheck {
  @Input() itemQueVaiSerEditado!: Item;
  editando = false;
  textoBtn= 'Salvar Item';
  valorItem!: string;
  constructor(
    private listaDeCompraService: ListaDeCompraService
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['itemQueVaiSerEditado'].firstChange){
      this.editando = true;
      this.textoBtn = 'Editar Item'
      this.valorItem = this.itemQueVaiSerEditado?.nome;
    }
  }
  
  ngDoCheck(): void {

  }
  editarItem(){
    this.listaDeCompraService.editarItemDaLista(this.itemQueVaiSerEditado,this.valorItem)
    this.limparCampo()
    this.editando = false
    this.textoBtn= 'Salvar Item';

  }
  adicionarItem(): void {
    this.listaDeCompraService.adicionarItemNaListe(this.valorItem);
    localStorage.setItem('ítens',this.valorItem)
    this.limparCampo();
  }
  limparCampo(): void {
    this.valorItem = '';
  }
}
