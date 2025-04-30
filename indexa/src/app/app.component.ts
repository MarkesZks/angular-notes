import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { SeparadorComponent } from './components/separador/separador.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { FormsModule } from '@angular/forms';

interface Contato {
  id: number;
  nome: string;
  telefone: string;
}

import agenda from './agenda.json';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ContainerComponent,
    CabecalhoComponent,
    SeparadorComponent,
    ContatosComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] = agenda;

  filtarPorTexto: string = '';

  private removerAcentos(texto:string):string{
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  filtrarContatosPorTexto():Contato[]{
    // Verifica se está vazia. usuário não digitou nada no input.
    if(!this.filtarPorTexto){
      return this.contatos
    }
    //Caso tenha digitado filtra a lista de contatos
    return this.contatos.filter(contato =>{
      //Passa uma função para cada contato verificando se ele inclui o texto digitado
      return this.removerAcentos(contato.nome).toLowerCase().includes(this.filtarPorTexto.toLowerCase())
    })}

  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    return this.filtrarContatosPorTexto().filter(contato => {
      return this.removerAcentos(contato.nome).toLowerCase().startsWith(letra);
    });
  }

  }




