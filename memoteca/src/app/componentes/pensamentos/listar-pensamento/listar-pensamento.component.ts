import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual:number = 1;
  haMaisPensamentos:boolean = true;
  filtro:string = '';
  favoritos:boolean = false;
  listaFavoritos:Pensamento[]=[]
  title:string = 'Meu Mural'

  constructor(
    private service: PensamentoService,
    private router:Router,

  ) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual,this.filtro,this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }
  reloadComponent(){
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = ()=>false;
    // shouldReuseRoute = ()=>false; -> Isso impede que o Angular reutilize a instância atual do componente. Normalmente, o Angular reusa componentes para otimizar o desempenho, mas aqui estamos forçando a criação de uma nova instância do componente, garantindo que ele seja totalmente recarregado
    this.router.onSameUrlNavigation = 'reload'
    //onSameUrlNavigation = 'reload' ->  Esta linha configura o roteador para recarregar o componente quando a navegação for para a mesma URL.
    this.router.navigate([this.router.url])
    //Esta linha usa o método navigate do roteador para navegar para a URL atual (this.router.url). Isso, em conjunto com onSameUrlNavigation = 'reload', força o Angular a recarregar o componente. É como dar um comando para ir para o mesmo lugar, mas com a instrução de atualizar tudo ao chegar lá.
/*
*/

    // location.reload()
    // O método location.reload() é uma forma simples de recarregar a página inteira do navegador.
  }
  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual,this.filtro,this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos.push(...listaPensamentos);
        if(!listaPensamentos.length) {
          this.haMaisPensamentos = false
        }
      })
  }
  pesquisarPensamentos(){
    this.haMaisPensamentos = true; // Botão ainda disponivel
    this.paginaAtual = 1; //Sempre ser a primeira pagina dos pensamentos
    this.service.listar(this.paginaAtual,this.filtro,this.favoritos)
    .subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }
  listarFavoritos(){
    this.title = 'Meus favoritos';
    this.favoritos = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual,this.filtro,this.favoritos).subscribe(
      listaPensamentosFavoritos =>{
        this.listaPensamentos = listaPensamentosFavoritos;
        this.listaFavoritos = listaPensamentosFavoritos;
      }
    )
  }

}

