import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,  } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Console } from 'console';
import { Item } from 'src/app/interfaces/iItem';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item!: Item;

  @Output() check = new EventEmitter();
  @Output() emitindoItemParaEditar = new EventEmitter();
  @Output() deleteItem = new EventEmitter();
  faPen = faPen;
  faTrash = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

  checarItem(){
    if(this.item.comprado==true){
      this.item.comprado = false
    }else{
      this.item.comprado =true
    }
  }

  editarItem() {
    this.emitindoItemParaEditar.emit(this.item);
  }
  deletarItem() {
    this.deleteItem.emit(this.item);
  }

}
