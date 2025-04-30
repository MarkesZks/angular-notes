import { PensamentoService } from '../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: 'I love Angular',
    autoria: 'Nay',
    modelo: 'modelo3',
    favorito: false
  }
  @Input() listaFavoritos:Pensamento[] = [];

  constructor(
     private service:PensamentoService
  ) { }

  ngOnInit(): void {
  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }
  mudarIconeFavorito():string{
    if(this.pensamento.favorito == false){
      return 'inativo'
    }
    return 'ativo'
  }
  atualizarFavoritos(){
    this.service.mudarFavorito(this.pensamento).subscribe(()=>{
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento),1)
      //usamos splice para remover um item do array listaFavoritos. O índice é encontrado usando indexOf, que retorna a posição do pensamento a ser removido. A quantidade a remover é 1, pois queremos remover apenas um pensamento.
    });

    /*
    O método subscribe() é usado para se inscrever em um Observable.
     Quando você chama mudarFavorito, ele retorna um Observable<Pensamento>, que representa uma operação assíncrona. Ao se inscrever, você está dizendo ao Angular para executar a chamada ao backend e, quando a resposta chegar, você pode lidar com essa resposta. No seu caso, você pode querer fazer algo com o pensamento atualizado ou simplesmente confirmar que a operação foi bem-sucedida.*/
  }
}
