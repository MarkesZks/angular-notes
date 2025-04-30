## Todas as minhas anotações sobre o Angular  
 
# Iniciando um Projeto Angular

1. Instale a CLI do Angular

```bash
--Versão padrão--
npm install angular --global
--Versão 17--
npm i @angular/cli@17 -g
```

1. Inicie um novo projeto

```bash
ng new nome-do-projeto
```

**Como modificar o estilo em um projeto ja existente:**

```jsx
ng config schematics.@schematics/angular:component.style scss
```

**Biuld do projeto**

```jsx
ng build
```

# 📦 1. Fundamentos do Angular

### 🧠 Conceitos Essenciais

- **Módulos:** São unidades de código que agrupam funcionalidades relacionadas. Eles servem para organizar o código da sua aplicação em partes menores e mais gerenciáveis. Cada módulo pode ter seus próprios componentes e serviços.
- **Componentes:** São as peças visuais da sua aplicação, responsáveis por exibir informações, receber entradas do usuário e executar ações. Eles são reutilizáveis e podem ser usados em diferentes módulos.
- **Services:** São funções que fornecem funcionalidades específicas, como acesso a dados, autenticação, comunicação com APIs, etc. Eles são geralmente independentes dos componentes e módulos e podem ser usados por diferentes partes da aplicação.
- **Interface:** Define a estrutura e o comportamento da sua aplicação, como ela se comunica com o usuário. É como o "contrato" entre a sua aplicação e o usuário, definindo o que ele pode fazer e como ele interage com a aplicação.
- **Template**:  Basicamente a View do componente. Arquivo HTML referente ao componente

### 🧱 Criando um Componente

**Criando Componentes**

```bash
ng generate component components/nome-seu-componente
```

Ou de forma reduzida

```bash
ng g c components/nome-seu-componente
```

Todo componente do Angular consiste em:

- Um template HTML
- Uma classe Typescript que define seu comportamento
- Um CSS para definir seu estilo
    
    <aside>
    📁
    
    **Diretivas de componentes**: usado com um modelo. Esse tipo de diretiva é a mais comum.
    
    Ex: `<app-listarPensamentos>`.
    
    **Diretivas estruturais**: altera o layout do DOM adicionando e removendo elementos DOM.
    
    Ex: `NgIf, NgFor. NgSwitch`.
    
    **Diretivas de atributos**: altera a aparência ou o comportamento de um elemento, componente ou outra diretiva.
    
    Ex: `NgClass, NgStyle`.
    
    </aside>
    

### Classe Componente

Toda classe que representa um componente no Angular deve ser  decorada com `@Component`

Esse decorator recebe alguns parâmetros. Como:

- selector = seletor para usar o importar o componente em outros arquivos
- templateUrl = path para o template HTML desse componente
- styleUrl = array de paths para arquivos de estilo a serem aplicados nesse componente
- **standalone:** Indica se esse componente irá possuir um módulo ou não
- **imports:** Imports necessários para seu componente como outros components, services…

```bash
@Component({
  selector: 'app-component-overview',
  templateUrl: './component-overview.component.html',
	styleUrls: ['./component-overview.component.css']
})
```

### 🗃️ App Module

No Angular, o **AppModule** é o módulo raiz da aplicação, responsável por definir e organizar os diferentes componentes, serviços e outros módulos que compõem a aplicação.

```tsx
@NgModule({
  declarations: [
    AppComponent,
    MeuPrimeiroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

- **declarations**: Define os componentes, diretivas e pipes pertencentes a esse módulo.
- **imports**: Especifica outros módulos que o **AppModule** depende, como o `BrowserModule` para rodar a aplicação em um navegador.
- **providers**: Lista os serviços disponíveis para a injeção de dependência em toda a aplicação.
- **bootstrap**: Define o(s) componente(s) que será(ão) inicializado(s) quando o aplicativo for carregado. Geralmente, é o componente de nível mais alto, como o `AppComponent`.

## 🧱 Feature Modules

**Feature modules** no Angular são módulos criados para organizar e encapsular funcionalidades específicas da aplicação. Eles servem para dividir o código em partes menores e mais gerenciáveis, tornando o desenvolvimento e a manutenção mais fáceis.

```tsx
@NgModule({

  declarations: [CursosComponent],
  imports: [
    CommonModule
  ],
  exports:[
    CursosComponent <--Exportando o componente 
  ]
})
export class CursosModule { }
```

**exports**: Define quais componentes, diretivas ou pipes deste módulo estarão disponíveis para outros módulos que importarem o `CursosModule`. No caso, o `CursosComponent` está sendo exportado, o que significa que ele poderá ser utilizado em outros módulos da aplicação se eles importarem o `CursosModule`.

Assim na classe App.module não precisara ser clarado o componente dentro de `declarations` , basta importar a Feature module que deseja:

```tsx
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    **CursosModule  <-- Import do modulo**
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

### 🔄 Lifecycle Hooks (Visão Técnica)

Podemos reagir a etapas do ciclo de vida do componente através dos `lifecycle hooks`

> Os hooks dão a você a oportunidade de agir em uma instância de componente ou diretiva no momento apropriado, conforme o Angular cria, atualiza ou destrói essa instância.
> 

| **hook** | **objetivo** |
| --- | --- |
| ngOnChanges() | é chamado toda vez que uma propriedade Input é setada ou atualizada  |
| ngOnInit() | É chamado na inicialização do componente. É um bom lugar para o componente fazer o fetch dos dados iniciais por exemplo |
| ngAfterViewInit() | É chamado logo após o componente realizar a primeira renderização, e a renderização de todos seus filhos. |
| ngOnDestroy() | É chamado pouco antes de Angular destruir a diretiva ou componente. Usado para propósitos de cleanup, como de unsubscribe
 |

### **🧬 Ciclo de Vida na Prática e Comunicação entre Componentes** (mais adiante).

# 🧠 2. Conceitos Essenciais do Framework

### Data Binding

### **Property Binding**

Para isso, você usa o *Property Binding*! Você coloca a variável `pontuacao` dentro de colchetes `[]` e a associa a um atributo do elemento HTML que você quer atualizar. Por exemplo, você pode associar `pontuacao` ao atributo `value` de um elemento `<span>`

```tsx
<span [value]="pontuacao"></span>
```

Ai na Classe TS:

```tsx
export class JogoComponent {
 pontuacao = 0
}
```

### *Property Binding* com interpolação

Em vez de usar colchetes `[]`, você usa chaves duplas `{{ }}` para inserir o valor da variável.

Imagine que você tem uma variável chamada `nome` no seu componente TypeScript, e você quer exibir o nome do usuário em um parágrafo no HTML.

Com o *Property Binding* com interpolação, você faria assim:

```tsx
<p>Olá, {{ nome }}!</p>
```

O Angular vai substituir `{{ nome }}` pelo valor da variável `nome` do seu componente TypeScript.

### **Event Binding**

Para isso, usamos parênteses `()` no *template* para indicar o evento que queremos "ouvir" (no nosso caso, o `click`) e associamos o método do *component* que será executado.

```tsx
 <div class="acoes">
                <button (click)="criarPensamento()" class="botao">Salvar</button>
                <button (click)="cancelar()" class="botao">Cancelar</button>
            </div>
```

### Explicando o `$event`

No Angular, o `$event` é um placeholder que representa o dado emitido pelo evento. Quando um evento é disparado, o valor passado para o método `emit()` do `EventEmitter` no componente filho é o que será acessado como `$event` no componente pai. No exemplo acima, o valor emitido é um número, mas poderia ser qualquer tipo de dado (objeto, string, etc.).

### Resumo do fluxo:

1. O componente filho cria um `EventEmitter` e emite um evento com um valor.
2. No componente pai, o template faz o binding desse evento para uma função usando `(nomeDoEvento)="funcao($event)"`.
3. O componente pai executa a função `funcao($event)` sempre que o evento é emitido, recebendo o valor emitido pelo componente filho.

### Tow-way Data Binding

Para implementar essa funcionalidade, utilizamos a diretiva `ngModel`, que faz parte do `FormsModule`. Essa diretiva, quando aplicada em um input, permite que as alterações no template sejam refletidas no componente e vice-versa.

Vimos também como utilizar a diretiva `ngModel` nos inputs de `pensamento`, `autoria` e `modelo`, garantindo a sincronização entre os campos e a prévia.

Com o fluxo de dados bidirecional, nosso formulário ficou mais interativo e responsivo!

Template:

```tsx
<input
  type="textarea"
  class="input"
  id="pensamento"
  name="pensamento"
  placeholder="Digite seu pensamento..."
  [(ngModel)]="pensamento.conteudo"
  >
```

App Module:

```tsx
import { FormsModule } from '@angular/forms';

//Restante das declarações
imports: [
 //Outros imports 
    FormsModule
  ],
```

### Input/Output properties

### Input

**Input** e **Output properties** são mecanismos de comunicação entre componentes pai e filho. Eles permitem que dados sejam passados de um componente para outro de forma controlada.

```jsx
// componente-filho.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-componente-filho',
  template: `<p>{{ nome }}</p>`
})
export class ComponenteFilho {
  @Input() nome: string; // Propriedade que pode ser definida pelo componente pai
}
```

Neste exemplo, o componente filho expõe a propriedade `nome` através de `@Input()`. O componente pai pode passar um valor para essa propriedade ao utilizá-lo no template:

```html
<app-componente-filho [nome]="nomeDoPai"></app-componente-filho>
```

O decorador `@Input()` aceita uma string como parâmetro. Esse nome será o que o componente pai usará para referenciar a propriedade, enquanto o nome interno da variável pode ser diferente no componente filho.

```jsx
@Input('nome') nomeCurso: string = '';
```

Componente pai:

```jsx
<app-curso [nome]="nomeDoCurso"></app-curso>
```

### Output

### **Output Properties** (`@Output`)

O decorador `@Output()` permite que um componente filho envie dados ou eventos para seu componente pai. Ele é usado junto com a classe `EventEmitter`, que emite eventos personalizados.

### Exemplo:

```tsx
// componente-filho.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-componente-filho',
  template: `<button (click)="enviarEvento()">Enviar Evento</button>`
})
export class ComponenteFilho {
  @Output() eventoDisparado = new EventEmitter<string>(); // Cria um evento

  enviarEvento() {
    this.eventoDisparado.emit('Mensagem do componente filho'); // Emite o evento com um valor
  }
}
```

No componente pai, você escuta o evento e define o que fazer quando ele for disparado:

```html
<app-componente-filho (eventoDisparado)="receberEvento($event)"></app-componente-filho>

```

E no componente pai, você implementa a função para tratar o evento:

```tsx
export class ComponentePai {
  receberEvento(mensagem: string) {
    console.log(mensagem); // Exibe "Mensagem do componente filho"
  }
}
```

### Class e Style Binding

### **Template Reference Variable**

Variáveis definidas no template HTML com `#` permitem que você acesse e manipule o DOM diretamente no componente TypeScript.

```tsx
<select #classe (change)="(0)">
  <option value="alert-success">Sucesso</option>
  <option value="alert-info">Info</option>
  <option value="alert-warning">Alerta</option>
  <option value="alert-danger">Erro</option>
</select>
```

- **`#classe`**: É uma **template reference variable**, que permite acessar o valor do `select` diretamente no DOM.
- **`(change)="(0)"`**: Ele escuta a mudança de valor no `select` (quando o usuário escolhe uma opção).O valor dentro do binding `(change)` deveria normalmente chamar uma função do componente Angular (como `(change)="onChangeHandler()"`), mas neste caso temos **`(0)`**, que não faz nada significativo.
    
    **Por que `0`?**
    
    - O uso de `(0)` como uma expressão é um truque para evitar que o Angular faça algo específico, simplesmente cancelando a ação ou mantendo o binding sem alterar nada no momento. Esse código provavelmente ainda está em desenvolvimento ou falta uma implementação completa da função a ser chamada.
    

### Class Binding

**`[class.<class-name>]`)**: Aplica ou remove uma classe CSS de um elemento dinamicamente com base em uma condição. 

- **Binding Simples de Classe**
    
    Você pode usar o **binding de classe** com uma única classe, onde o valor da classe é ativado ou desativado com base em uma expressão booleana.
    
    ```tsx
    <div [class.nomeDaClasse]="expressaoBooleana">Conteúdo</div>
    ```
    
    - Se a **`expressaoBooleana`** for `true`, a classe **`nomeDaClasse`** será aplicada ao elemento. Se for `false`, a classe não será aplicada.
    
    Outro exemplo: 
    
    ```tsx
    <div class="alert" role="alert" [class.alert-success]="classe.value == 'alert-success'">Sucesso</div>
    ```
    
    - Ira adicionar a Classe **`alert-success`** caso o valor que a variavel Template **`#Classe`**
      .value seja igual ao nome da classe

### Style Binding

- **Exemplo com valor condicional:**

```html
<div class="alert alert-danger" role="alert" [style.display]="classe.value == 'alert-danger' ? 'block' : 'none'">
  Esse texto somente aparece em caso de erro
</div>
```

**Style Binding (`[style.<property>]`)**

- **`[style.display]`**: Controla o valor da propriedade CSS `display`.
- Aqui, o `div` é mostrado (`block`) ou ocultado (`none`) dependendo se o valor selecionado no combobox é `alert-danger`.
- Se `classe.value == 'alert-danger'`, o `display` será `'block'`, e a mensagem **"Esse texto somente aparece em caso de erro"** será exibida.
- Caso contrário, o `div` fica escondido.

Exemplo Simples:

```html
<div [style.color]="isError ? 'red' : 'green'">Mensagem</div>
```

### Diretivas

### Estruturais

### NgFor

O `ngFor` é uma diretiva estrutural do Angular que nos permite iterar sobre um array e renderizar um template para cada item do array. É como um `for` tradicional, mas com a mágica do Angular!

Imagine que você tem uma lista de compras com vários itens. Você pode usar o `ngFor` para criar um elemento HTML para cada item da lista, exibindo o nome e a quantidade de cada um.

```tsx
<ul>
  <li *ngFor="let item of listaDeCompras">
    {{ item.nome }} - {{ item.quantidade }}
  </li>
</ul>

```

Neste exemplo, `listaDeCompras` é um array que contém os itens da sua lista de compras. O `ngFor` itera sobre cada item do array e cria um elemento `<li>` para cada um, exibindo o nome e a quantidade do item.

- **Mais informações** 
A sintaxe do *ngFor é bem simples. Digamos que você tenha uma lista de nomes. Você poderia exibi-los em uma lista ordenada assim:
    
    ```tsx
    <ul>
      <li *ngFor="let nome of nomes">{{ nome }}</li>
    </ul>
    ```
    
    Aqui, `let nome` cria uma variável de template `nome` para cada item da lista nomes, e cada `{{ nome }}` é substituído pelo valor de cada item.
    
    Mas, como em qualquer bom conto de evolução, as coisas mudam. Com o passar do tempo, o Angular foi evoluindo e introduziu o **@for**, uma forma mais atual e às vezes mais conveniente de fazer o mesmo trabalho. Mas não se engane: conhecer o `*ngFor` ainda é super importante, especialmente se você trabalhar em projetos mais antigos ou em códigos que ainda não foram atualizados.
    
    Então, aí está: uma viagem no tempo com o Angular, do `*ngFor` ao `@for`, cada um com seu charme e importância. E agora, com esse conhecimento em mãos, você está mais equipado para enfrentar os desafios do mundo do desenvolvimento Angular, seja qual for a versão que encontrar pelo caminho.
    

### NgIf

Vimos como usar o `ngIf` para mostrar um aviso caso não haja pensamentos cadastrados no mural, utilizando a propriedade `listaPensamentos.length` para verificar se a lista está vazia.

Também aprendemos a usar o `else` com o `ngIf`, criando um `ng-template` para exibir uma mensagem caso a condição do `ngIf` seja falsa.

```tsx
<div class="mural" *ngIf="listapensamentos.length>0, else semPensamentos">

    <div *ngFor="let pensamento of listapensamentos">
      <app-pensamento [pensameto]="pensamento"></app-pensamento>
    </div>

  </div>
  

```

### De Atributos

### NgModel

Bora falar sobre uma das estrelas do Angular, o `[(ngModel)]`, também conhecido como "banana in a box" (banana na caixa). Mas por que esse nome engraçado? Vem comigo que você vai entender tudo sobre esse poderoso recurso e como ele resolve um problema comum em aplicações web.

Vamos começar com o conceito de **two-way data binding**, ou "vinculação bidirecional de dados". Imagine isso como uma via de mão dupla entre o seu modelo de dados (no seu componente TypeScript) e a sua view (o template HTML). O `[(ngModel)]` é o mago por trás dessa mágica. Ele sincroniza automaticamente os dados entre o modelo e a view. Se você alterar algo no input do seu formulário, essa mudança reflete imediatamente no modelo de dados, e vice-versa.

Agora, sobre o "banana in a box". Esse apelido vem da própria sintaxe do `[(ngModel)]`. O `[]` é como uma "caixa", representando o binding do modelo para a view (one-way data binding). Já o `()` é como uma "banana", simbolizando o event binding da view para o modelo. Junte os dois, e você tem a "banana in a box" – uma maneira fácil de lembrar que o **[(ngModel)]** faz o two-way data binding!

Falando em one-way data binding, ele é como uma via de mão única. Com ele, ou você atualiza a view a partir do modelo de dados (usando []) ou atualiza o modelo a partir da view (usando ()), mas não ambos simultaneamente.

Mas atenção: para usar o [(ngModel)], você precisa importar o FormsModule no seu módulo Angular. Sem ele, nada de banana in a box!

E qual o problema que o [(ngModel)] vem resolver? Imagine que você tem um formulário com vários campos. Sem o [(ngModel)], você teria que sincronizar manualmente cada campo com seu modelo de dados e vice-versa. Com o [(ngModel)], essa sincronização é automática, economizando seu tempo e evitando erros.

E não para por aí! O [(ngModel)] não é só para inputs de texto. Ele funciona maravilhosamente com outros elementos de formulário, como select e checkbox. Por exemplo:

### **Select:**

```html
<select [(ngModel)]="selecaoAtual">
  <option *ngFor="let opcao of opcoes" [value]="opcao">{{ opcao }}</option>
</select>
```

### **Checkbox:**

```html
<input type="checkbox" [(ngModel)]="estaSelecionado">
```

### @for

Imagine o `@for` como um "laço de repetição" dentro do seu template. Ele permite que você percorra cada item de uma lista e exiba informações específicas de cada um.

```tsx
  @for (letra of alfabeto; track letra) {
    <li>{{letra}}</li>
    }

```

- **`@for`**: Essa é a palavra-chave que indica que você está usando a diretiva `@for`.
- **`(item of lista)`**: Essa parte define a variável `item` que irá representar cada elemento da lista. A variável `lista` é a lista que você quer iterar.
- **`trackBy: trackByFn`**: Essa parte é opcional, mas é altamente recomendada. Ela define uma função `trackByFn` que o Angular usa para identificar cada item da lista de forma única. Isso ajuda a evitar renderizações desnecessárias quando a lista é modificada.

**Função `trackByFn`:**

A função `trackByFn` recebe dois parâmetros:

- **`index`**: O índice do item na lista.
- **`item`**: O item da lista.

A função deve retornar um valor único que identifique o item. Por exemplo, você pode retornar o `id` do item ou o nome do item.

```tsx
trackByFn(index: number, item: any): any {
  return item.id;
}
```

```tsx
<ul>
  @for (item of listaDeFrutas; trackBy: trackByFn) {
    <li>{{ item }}</li>
  }
</ul>
```

### @Input

O `@Input` é como um "caminho" que permite que um componente "filho" receba informações do seu componente "pai".

Depois, no componente "pai" (`listar-pensamento.component.html`), usamos o *Property Binding* (`[pensamento]`) para enviar as informações da variável local `pensamento` para o componente "filho".

```tsx
   <div *ngFor="let pensamento of listapensamentos">
      <app-pensamento [pensameto]="pensamento"></app-pensamento>
    </div>
```

Com isso, conseguimos que o componente "filho" receba as informações do "pai" e as exiba na tela.

### ng-template

O `ng-template` é como um "bloco de construção" que você pode usar para criar partes de sua interface que só serão exibidas em determinadas situações. Ele é como um "molde" que você guarda para usar depois.

Imagine que você está construindo um site de e-commerce e quer mostrar um banner de desconto apenas para usuários que estão comprando pela primeira vez. Você pode usar o `ng-template` para criar esse banner:

```tsx
<ng-template #bannerDesconto>
  <div class="banner">
    <h2>Seja bem-vindo!</h2>
    <p>Aproveite 10% de desconto na sua primeira compra.</p>
  </div>
</ng-template>

```

Para mostrar o banner apenas para usuários que estão comprando pela primeira vez, você pode usar o `ngIf` com o `else`:

```tsx
<div *ngIf="usuario.primeiraCompra, else bannerDesconto">
  <!-- Conteúdo para usuários que não são de primeira compra -->
</div>

<ng-template #bannerDesconto>
  <div class="banner">
    <h2>Seja bem-vindo!</h2>
    <p>Aproveite 10% de desconto na sua primeira compra.</p>
  </div>
</ng-template>
```

### Criando Diretivas personalizadas

As diretivas no Angular são classes que adicionam ou modificam um comportamento existente no DOM. Elas funcionam como funções que são chamadas quando o compilador as encontra.

Existem 3 tipos de diretivas:

1. Diretivas de atributos;
2. Diretivas Estruturais;
3. Componentes.

**As Diretivas de atributo** alteram a aparência e o comportamento dos elementos DOM e componentes, alterando estilos, tornando-os visíveis ou não por meio de uma condição. Alguns exemplos de diretivas são NgClass, NgStyle e NgModel.

**As Diretivas estruturais** alteram a estrutura do DOM. O nome das diretivas sempre vem com o prefixo asterisco `*`. Elas adicionam ou removem elementos DOM, diferente das diretivas de atributos, que alteram a aparência e o comportamento. As diretivas estruturais mais comuns são NgIf, NgFor e NgSwitch.

**Componente é uma diretiva** com um modelo. Como assim? As diretivas basicamente manipulam o DOM, seja alterando a aparência ou adicionando e removendo elementos do DOM, e o que é feito com um componente é mostrar algo no DOM, portanto, o componente é uma diretiva com um template.

Entenda mais sobre as diretivas presentes no Angular, lendo a [documentação](https://angular.dev/guide/directives).

Agora vou apresentar uma diretiva que irá alterar a cor quando escutar um evento. Veja como a estrutura da classe de uma diretiva é bem parecida com a de um componente.

```kotlin
@Directive({
    selector: '[mudandoCor]',
})
exportclassMudarCorDirective {
constructor() {}
}
```

Logo que batemos o olho já é possível notar algumas diferenças, como o decorador @Directive com um objeto que possui um selector, onde é passado o nome do selector. O nome é encapsulado por `[]`, isso faz com que a diretiva seja encontrada como atributo no DOM.

```xml
<p class=”paragrafo” mudandoCor>Texto exemplo</p>

```

Caso queira que ele seja aplicado como classe, basta retirar os colchetes e adicionar o prefixo “.”.

```css
@Directive({
    selector: '.mudandoCor',
})
```

E para aplicar, é só acrescentar na classe do elemento DOM.

```xml
<p class=”paragrafo mudandoCor”>Texto exemplo</p>

```

Na classe da diretiva, vou injetar a dependência de ElementRef para que eu tenha acesso ao elemento DOM. Em seguida, vou declarar o método @HostListener, que vai escutar o evento “mouseover” e chamar uma função que vai acessar o elemento e alterar sua cor para “red”, e depois outro método @HostListener que vai ouvir o evento “mouseleave” e alterar para a cor “#EB9B00”

```tsx
exportclassMudarCorDirective {
    // @Input() mudandoCor: any;
constructor(
private eleRef: ElementRef
    ) {}
    @HostListener('mouseover')onMouseOver() {
        this.eleRef.nativeElement.style.color = 'red';
    }
    @HostListener('mouseleave')onMouseLeave() {
        this.eleRef.nativeElement.style.color = 'var(--laranja)';
    }
```

Assim, quando o mouse estiver sobre o parágrafo, o texto vai ficar na cor vermelha e quando tirar o mouse ficará laranja.

Desse modo, criei uma diretiva de atributos para alterar a aparência de um elemento DOM.

### Decorators

### **ViewChild**

O `@ViewChild` é um decorador que permite que você faça referência a um elemento ou componente filho da sua template diretamente no seu código TypeScript. Isso é útil, por exemplo, quando você deseja:

- Controlar ou modificar elementos do DOM diretamente.
- Acessar métodos e propriedades de componentes filhos.
- Gerar manipulação que requer uma referência direta ao elemento ou componente.

Para usar o `@ViewChild`, siga os passos abaixo:

**Passo 1: Acesse o elemento ou componente com uma variável de template**

```tsx
<!-- Elemento HTML com uma referência de template -->
<input #inputElement type="text">
```

**Passo 2: Declare o `@ViewChild` no componente TypeScript**

```tsx
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-meu-componente',
  templateUrl: './meu-componente.component.html'
})
export class MeuComponente {
  // Captura a referência do input no DOM
  @ViewChild('inputElement') inputRef!: ElementRef;

  ngAfterViewInit() {
    // Agora temos acesso ao elemento DOM diretamente
    this.inputRef.nativeElement.focus(); // Coloca o foco no input
  }
}
```

`ngAfterViewInit()`: É importante lembrar que os elementos DOM ou componentes referenciados só estarão disponíveis após o ciclo de vida do `ngAfterViewInit`, então qualquer manipulação deve ser feita a partir desse momento.

# 📝 3. Trabalhando com Formulários

### Reactive forms

Reactive Forms é uma abordagem usada no Angular para construir e gerenciar formulários de maneira programática e baseada em eventos reativos. Essa técnica usa o framework RxJS (biblioteca para programação reativa) e oferece mais controle sobre a validação, o estado e a lógica de negócios associada aos formulários.

### FormGroup

Você pode criar um novo formulário, atribuindo a ele uma nova instância da classe **FormGroup** e, para cada input, uma instância da classe **FormControl**. Assim:

```tsx
ngOnInit(): void {
    this.formulario = new FormGroup({
      conteudo: new FormControl(''),
      autoria: new FormControl(''),
      modelo: new FormControl('')
    })
  }
```

No lugar de instanciar um **FormGroup** e um **FormControl** para cada campo do formulário, você pode utilizar o construtor de formulários do angular, o **FormBuilder** e utilizar uma sintaxe simplificada, como visto na aula. Por “debaixo dos panos”, o FormBuilder vai atribuir os controles aos campos, sem precisarmos nos preocupar com isso.

```tsx
ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: [''],
      autoria: [''],
      modelo: ['']
    })
  }
```

Para associar o formulário reativo temos que criar a diretiva a baixo no formulário HTML

```tsx
<form [formGroup]="formulario">
<input 
type="textarea"
class="input"
id="pensamento"
formControlName="conteudo"
placeHolder="Digite bla bla bla"
>
</form>
```

### Acessar os valores dos campos do formulário no template com o método get.

Em um formulário reativo, você sempre pode acessar qualquer controle de formulário através do método get, passando para ele o campo e a propriedade que deseja acessar. Como queremos o valor do campo, devemos passar a propriedade value.

```jsx
<p>{{ formulario.get('conteudo')?.value }}</p>
```

### FormBuilder

Imagine o `FormBuilder` como um "construtor de Lego" para formulários. Ele te fornece blocos pré-definidos (como `FormGroup`, `FormControl`, `FormArray`) que você pode combinar para criar estruturas complexas e personalizadas.

**Para que serve o FormBuilder?**

- **Organização:** Ele te ajuda a organizar os campos do seu formulário de forma estruturada, usando `FormGroup` para agrupar campos relacionados e `FormControl` para representar cada campo individualmente.
- **Validação:** Você pode definir regras de validação para cada campo usando o `FormBuilder`, garantindo que os dados inseridos pelo usuário estejam no formato correto.
- **Facilidade de uso:** Ele simplifica a criação de formulários, oferecendo métodos convenientes para construir e manipular os campos.

**Como usar o FormBuilder?**

1. **Importar:** Importe o `FormBuilder` do módulo `@angular/forms`:
    
    
    ```tsx
    **import** { **FormBuilder** } **from** '@angular/forms';
    ```
    
2. **Injetar:** Injete o `FormBuilder` no construtor da sua classe do componente:
    
    ```tsx
    **constructor**(**private** formBuilder: FormBuilder) { }
    ```
    
3. **Criar o formulário:** Use o método `group` do `FormBuilder` para criar um `FormGroup` com os campos do seu formulário:

```tsx
**this**.formulario = **this**.formBuilder.group({
  nome: ['', Validators.required], // Campo "nome" com validação obrigatória
  email: ['', [Validators.required, Validators.email]], // Campo "email" com validação obrigatória e de formato de email
  // ... outros campos
});
```

**Exemplo:**

```tsx
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meu-formulario',
  templateUrl: './meu-formulario.component.html',
  styleUrls: ['./meu-formulario.component.css']
})
export class MeuFormularioComponent {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', Validators.maxLength(255)]
    });
  }

  // ...
}
```

### **Validators**

Os “validators” ou validadores, são mais uma facilidade que o Angular traz no pacote @angular/forms. Essa classe já traz inúmeros tipos de validações prontas para serem utilizadas. É incrível como isso facilita o desenvolvimento. Um validador é uma função que processa uma coleção de controles e retorna um erro ou nulo (o retorno nulo significa que a validação foi aprovada).

Você conheceu na aula, o **Validators.required()**, **Validators.minLenght()**, **Validators.pattern()** e o **Validators.compose()**, mas existem diversos outros tipos de validação presentes na classe Validators. Conheça:

- Validators.min()
    - Validador que exige que o valor do controle seja maior ou igual ao número fornecido.
- Validators.max()
    - Validador que exige que o valor do controle seja menor ou igual ao número fornecido.
- Validators.requiredTrue()
    - Validador que exige que o valor do controle seja verdadeiro. Este validador é comumente usado para caixas de seleção obrigatórias.
- Validators.email()
    - Validador que exige que o valor do controle passe em um teste de validação de email.
- Validators.maxLength()
    - Validador que exige que o comprimento do valor do controle seja menor ou igual ao tamanho máximo fornecido.
- Validators.nullValidator()
    - Validador de valores nulos.
- Validators.composeAsync()
    - Compõe vários validadores assíncronos em uma única função que retorna a união dos objetos de erro individuais para o controle fornecido.

Na [documentação do Angular](https://angular.dev/api/forms/Validators), você pode encontrar mais detalhes sobre a classe Validators.

### Touched

A propriedade `touched` funciona como um "detector de toque" no campo do formulário. Ela indica se a pessoa usuária já interagiu com o campo, ou seja, se ela clicou nele, digitou algo ou até mesmo passou o mouse por cima.

**Utilizando `touched` na prática:**

No código HTML, você pode usar a propriedade `touched` dentro da diretiva `ngIf` para mostrar mensagens de erro apenas quando o campo for tocado. Por exemplo:

```jsx
<div *ngIf="formulario.get('nome').errors && formulario.get('nome').touched">
  <span class="mensagem-erro">Nome é obrigatório!</span>
</div>
```

### Tipos de Formulários Angular

O Angular possui duas formas de validação de formulários, o **Template Driven** e **Data Driven** ou **Reactive Forms**. As diferenças entre eles são:

1. **Template Driven**:
    - A implementação acontece diretamente no template do componente, ou seja, você define a estrutura e a lógica do formulário no HTML.
    - Para usar esse tipo de formulário, é necessário importar o módulo `FormsModule`.
    - A validação e a lógica de controle do formulário funcionam de forma assíncrona, o que significa que as atualizações podem não ser imediatas.
2. **Reactive Forms**:
    - Aqui, toda a lógica do formulário é feita no componente TypeScript. Isso proporciona um controle mais direto e programático sobre o formulário.
    - Para utilizar os Reactive Forms, você precisa importar o módulo `ReactiveFormsModule`.
    - A validação e o controle do formulário funcionam de forma síncrona, o que significa que as atualizações são imediatas e mais previsíveis.

# 🧭 4. Navegação e Interatividade

### Rotas

### Como funcionam

As rotas funcionam como ondas de rádio: para ouvir uma estação específica, precisamos sintonizar na frequência dela. Da mesma forma, para acessar um componente específico, precisamos definir uma rota para ele.

```tsx

const routes: Routes = [
  {
    path:'',
    redirectTo:'listarPensamento', //Redireciona a pagina principal para pagina de ListarPensamentos
    pathMatch: 'full' // Quando path for vazio precisar criar o PathMatch, podemos passar dois valores prefix ou full,
  },
  {
    path:'criarPensamento',
    component: CriarPensamentoComponent
  },
  {
    path:'listarPensamento',
    component: ListarPensamentoComponent
  }
];

```

### ActivatedRoute

**`private route: ActivatedRoute`**: Essa injeção te dá acesso ao serviço `ActivatedRoute`, que é como um "guia turístico" que fornece informações sobre a rota atual. Ele te diz qual é a rota que o usuário está navegando, e te permite acessar parâmetros da rota, como o `id` do pensamento que você quer excluir.

```tsx
 ngOnInit():void{
    const id= this.route.snapshot.paramMap.get('id')
  }
```

- **`.snapshot`**: O `snapshot` é uma propriedade do `ActivatedRoute` que nos dá acesso a um "instantâneo" dos dados da rota atual. Isso significa que ele nos fornece informações sobre a rota no momento em que o componente é inicializado.
- **`.paramMap`**: O `paramMap` é uma propriedade do `snapshot` que nos dá acesso a um mapa de parâmetros da rota atual. Os parâmetros da rota são valores que podem ser passados na URL para identificar recursos específicos.
- **`.get('id')`**: O método `get('id')` é usado para obter o valor do parâmetro `id` do mapa de parâmetros.

### routerLink

O `routerLink` é uma diretiva do Angular que transforma um elemento HTML, como um botão, em um link que permite a navegação para uma rota específica.

`<button *class*="botao" *routerLink*="/criarPensamento">Adicionar pensamento</button>`

### RouterModule

O RouterModule é um módulo do Angular que permite definir rotas na sua aplicação, diferentes estratégias de correspondência de caminho, fácil acesso aos parâmetros de rota e proteções de rota para proteger os componentes contra acesso não autorizado.

Na aula vimos a diretiva `<router-outlet>` que é responsável por renderizar a rota solicitada pelo usuário e por meio da propriedade routerLink podemos passar para um botão ou ancora o componente que será renderizado a partir dele.

### router.navigation

Ele é um método que você chama para navegar para uma rota específica. Você precisa passar um array de strings que representam o caminho da rota para onde você quer ir.

**Exemplo:** `this.router.navigate(['/listarPensamento'])` navega para a rota `/listarPensamento`.

**Flexibilidade:** O `router.navigate` te dá mais flexibilidade, pois você pode usá-lo em qualquer lugar do seu código e passar parâmetros para a rota.

- **`router.navigate`:** Use quando você precisar de mais flexibilidade, como navegar para uma rota com parâmetros ou quando a navegação for acionada por um evento, como um botão.
- **`routerLink`:** Use quando você precisar de uma navegação simples, como criar um link para outra página.

### Declarando rotas

Dentro do arquivo `app.routing.module` podemos definir as rotas do nosso projeto, no array de `Routes`

```bash
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];
```

**Outra forma de declarar a home**

```bash
	{
    path: 'home',
    component: HomeComponent
  }
```

Nesta parte, estamos declarando uma rota com o caminho ('path') '/home'. Isso significa que, quando o usuário navegar para '/home' na URL, o componente 'HomeComponent' será renderizado. Em outras palavras, estamos associando o componente 'HomeComponent' ao caminho '/home'.

```bash
	{
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
```

Aqui, estamos declarando uma rota curinga (wildcard) utilizando o caminho '**'. Essa rota curinga é usada para capturar todas as rotas não definidas anteriormente. Ou seja, se o usuário acessar qualquer URL que não corresponda a '/home', ele será redirecionado para '/home'.

O redirecionamento é especificado pela propriedade 'redirectTo', que possui o valor 'home'. Isso significa que, ao encontrar uma rota curinga, o Angular redirecionará o usuário para a rota '/home'.

A propriedade 'pathMatch' especifica como o Angular deve fazer a correspondência entre a URL e o caminho definido na rota. No caso de 'pathMatch: 'full'', a correspondência ocorre quando a URL completa coincide com o caminho definido. Isso garante que o redirecionamento seja ativado somente se a URL não corresponder a nenhuma rota definida anteriormente.

**Outro exemplo:**

```bash
{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
},
```

Nesse trecho, estamos declarando uma rota vazia, ou seja, quando a URL não possui um segmento adicional após o domínio e a barra (por exemplo, "[**https://exemplo.com/**](https://exemplo.com/)"). Quando o usuário acessa essa rota vazia, o Angular redireciona automaticamente para a rota especificada em **`redirectTo`**. No caso, estamos redirecionando para a rota 'home', que é definida por **`'home'`**.

A propriedade **`pathMatch`** é definida como **`'full'`**, o que significa que a URL precisa corresponder exatamente ao caminho especificado. Isso garante que apenas quando a URL estiver vazia, ocorra o redirecionamento para a rota 'home'. Caso contrário, essa rota não será ativada.

```

{
    path: '**',
    component: HomeComponent
}

```

Aqui, estamos declarando outra rota curinga (wildcard) usando o caminho **`'**'`**. Essa rota será correspondida quando a URL não corresponder a nenhuma das rotas anteriores definidas na aplicação. Basicamente, serve como uma rota de fallback para qualquer URL inválida que o usuário possa digitar.

Nessa rota curinga, estamos associando o componente **`HomeComponent`**. Isso significa que, se o usuário acessar uma URL inválida ou não mapeada, o componente **`HomeComponent`** será renderizado. Geralmente, o componente **`HomeComponent`** é usado como uma página padrão ou página de erro 404.

Portanto, a primeira rota vazia redireciona para a rota 'home' quando a URL está vazia, enquanto a segunda rota curinga exibe o componente **`HomeComponent`** para qualquer outra URL inválida.

### Modal

Um modal é como uma caixa que aparece em cima da tela, geralmente com um fundo escuro, para chamar a atenção do usuário para uma informação importante ou para uma ação específica. Imagine um pop-up que te impede de interagir com o resto da página até que você tome uma decisão.

Criamos um novo componente para o Modal: 

```tsx
<section class="container ff-inter excluir-pensamentos">
  <div class="modal">
    <p>O pensamento será deletado. <br/> Confirma a exclusão? </p>
    <div class="acoes">
      <button class="botao botao-excluir" (click)="excluirPensamento()">Excluir</button>
      <button class="botao bota-cancelar" (click)="cancelar()">Cancelar</button>
    </div>
  </div>
  <div class="overlay"></div>
</section>
```

### Paginação

### **Conceito:**

paginação é uma técnica usada para dividir um grande conjunto de dados em partes menores, chamadas páginas, exibindo apenas uma página por vez.

### Como implementar:

### HttpParams

Podemos fazer isso de duas maneiras: concatenando strings diretamente na URL (menos seguro e elegante) ou usando a classe `HttpParams` do Angular (mais seguro e elegante).

```jsx
  listar(pagina:number): Observable<Pensamento[]> {
    const intensPorPagina= 6;
    let params = new HttpParams()
    .set("_page",pagina)
    .set("_limit",intensPorPagina)
    return this.http.get<Pensamento[]>(this.API,{params:params})
  }
```

- **Definição do método `listar`**: Aqui você está definindo um método chamado `listar`, que recebe um parâmetro chamado `pagina` do tipo `number`. O método retorna um `Observable` que emitirá um array de objetos do tipo `Pensamento`.
- **Definição da constante `itensPorPagina`**: Nesta linha, você está criando uma constante chamada `itensPorPagina` e atribuindo o valor 6 a ela. Isso significa que você deseja exibir 6 pensamentos por página.
- **Instanciação do `HttpParams`**: Aqui, você está criando uma nova variável chamada `params`, que é uma instância da classe `HttpParams`. Essa classe será usada para armazenar os parâmetros que você deseja enviar na requisição HTTP.
- **Adicionando o parâmetro `_page`**: Com o método `set`, você está adicionando um parâmetro chamado `_page` e atribuindo a ele o valor da variável `pagina`, que foi passada como argumento para o método. Isso indica qual página de resultados você deseja obter.
- Adicionando o parâmetro _limit: Novamente usando o método set, você está adicionando um parâmetro chamado _limit e atribuindo a ele o valor da constante itensPorPagina. Isso limita a quantidade de resultados retornados pela API para 6.
- **Fazendo a requisição HTTP**: Por fim, você está fazendo uma requisição GET usando o `HttpClient`. O primeiro argumento é a URL da API (`this.API`) e o segundo argumento é um objeto que contém os parâmetros que você configurou anteriormente. O método retorna um `Observable` que emitirá um array de objetos do tipo `Pensamento`.

### HTTPParams metodos

A classe HttpParams representa um corpo de requisição/resposta HTTP com parâmetros serializados.

Esta classe é imutável, ou seja, todas as operações de mutação retornam uma nova instância. O método ‘set’ que utilizamos, serve para substituir o valor de um parâmetro. É enviado o nome do parâmetro e o seu valor e é retornado um novo corpo com um novo valor.

Conheça os outros métodos do HttpParams:

- HttpParams.has()
    - Informa se o corpo inclui um ou mais valores para um determinado parâmetro.
- HttpParams.get()
    - Recupera o primeiro valor de um parâmetro.
- HttpParams.getAll()
    - Recupera todos os valores de um parâmetro.
- HttpParams.keys()
    - Recupera todos os parâmetros para este corpo da requisição.
- HttpParams.append()
    - Acrescenta um novo valor aos valores existentes para um parâmetro.
- HttpParams.appendAll()
    - Constrói um novo corpo com valores anexados para o nome do parâmetro fornecido.
- HttpParams.delete()
    - Remove um determinado valor ou todos os valores de um parâmetro.
- HttpParams.toString()
    - Serializa o corpo da requisição em uma string codificada, em que os pares de chave-valor (separados por =) são separados por & s.

**Busca por propriedade:** 

Durante a aula, você aprendeu como pesquisar pensamentos por meio de um parâmetro ‘q’, que, conforme a documentação, vai buscar a correspondência passada (a string do filtro) no objeto inteiro, é uma pesquisa de texto completo. 

```jsx
 listar(pagina:number,filtro:string): Observable<Pensamento[]> {
    const intensPorPagina= 6;
    let params = new HttpParams()
    .set("_page",pagina)
    .set("_limit",intensPorPagina)
    if(filtro.trim().length>2) {  //remove os espaços vazios
      //q -> vem de query para filtrar por texto
      params = params.set("q",filtro)
    }
    return this.http.get<Pensamento[]>(this.API,{params:params})
  }

```

Caso você queira uma maior especificidade, ou seja, filtrar por alguma propriedade em particular ou por mais de uma ao mesmo tempo, o JSON-Server dá suporte a essa necessidade.

Supondo que você tenha um arquivo db.json com os seguintes dados:

```jsx
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

Pode utilizar:

- GET /posts?title=json-server&author=typicode
    - Para filtrar posts pelo título e autor
- GET /comments?author.name=typicode
    - Para filtrar comentários pela propriedade ‘name’ do autor, usando o . (ponto) para acessar objetos aninhados.

### Parametros na URL

Para implementar a paginação, usamos parâmetros na URL da requisição HTTP. A API que estamos usando aceita os parâmetros `_page` (para indicar o número da página) e `_limit` (para indicar quantos itens devem ser retornados por página).

```tsx
listar(pagina:number): Observable<Pensamento[]> {
    const intensPorPagina= 6;
    //GET /post?_page=7&_limit=20
    return this.http.get<Pensamento[]>(`${this.API}?_page=${pagina}&_limit=${intensPorPagina}`)
  }
```

# 🧰 5. Serviços e Injeção de Dependência

## 🔧 O que são Services?

Services no Angular são como **caixas de ferramentas reutilizáveis**. Eles concentram a lógica de negócios da aplicação, como comunicação com o backend, validações ou manipulação de dados, e são utilizados por diferentes componentes por meio da **injeção de dependência**.

### Analogia:

> Pense em uma construção. Cada parte da casa pode precisar de ferramentas — serra, martelo, chave de fenda. Um service é essa caixa de ferramentas que você usa onde for necessário.
> 

---

## 🛠️ Criando um Service

Crie com o Angular CLI:

```tsx

@Injectable({
  providedIn: 'root' // torna o service Singleton e disponível globalmente
})
export class CursosService {
  getCursos() {
    return ['Java', 'Ext JS', 'Angular'];
  }
}

```

---

## 🧩 Injeção de Dependência

A **injeção de dependência** permite que um componente "pegue" um service de forma automática e reutilizável. Basta declarar o service como parâmetro do construtor:

```tsx
ts
CopyEdit
@Component({ ... })
export class CursosComponent {
  cursos: string[];

  constructor(private cursoService: CursosService) {
    this.cursos = this.cursoService.getCursos();
  }
}

```

---

### 🔄 Singleton com `providedIn: 'root'`

O Angular disponibiliza o service globalmente com apenas uma instância (padrão **Singleton**), tornando-o eficiente e reaproveitável em toda a aplicação.

---

## 📡 Observables (RxJS)

No Angular, Observables são fundamentais para lidar com **eventos assíncronos** como requisições HTTP, eventos do DOM, e reatividade em formulários.

### Conceito:

- Um `Observable` é uma **fonte de dados que emite valores com o tempo** (stream).
- É possível **se inscrever** com `.subscribe()` e reagir a cada valor emitido.
- Vem da biblioteca RxJS (`Reactive Extensions for JavaScript`).

### Exemplo com requisição:

```tsx
ts
CopyEdit
export class ListarPensamentoComponent {
  listapensamentos: Pensamento[] = [];

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.listar().subscribe((dados) => {
      this.listapensamentos = dados;
    });
  }
}

```

### Características do Observable:

1. **Fonte assíncrona** (HTTP, eventos, timers)
2. **Emissões múltiplas** (diferente de `Promise`)
3. **Cancelamento** com `unsubscribe()`
4. **Transformações** com operadores (`map`, `filter`, `switchMap`, etc.)

---

## 🌐 HTTP com Angular

O Angular usa o `HttpClient` (RxJS + Observables) para comunicação com APIs REST.

### Métodos HTTP com exemplos:

### ✅ GET (buscar)

```tsx

buscarPorId(id: number): Observable<Pensamento> {
  const url = `${this.API}/${id}`;
  return this.http.get<Pensamento>(url);
}

```

### 📤 POST (criar)

```tsx
criar(pensamento: Pensamento): Observable<Pensamento> {
  return this.http.post<Pensamento>(this.API, pensamento);
}

```

### 🔁 PUT (atualizar todo)

```tsx

editarPensamento(pensamento: Pensamento): Observable<Pensamento> {
  const url = `${this.API}/${pensamento.id}`;
  return this.http.put<Pensamento>(url, pensamento);
}

```

### 🗑 DELETE (remover)

```tsx
excluir(id: number): Observable<Pensamento> {
  const url = `${this.API}/${id}`;
  return this.http.delete<Pensamento>(url);
}

```

### 🧩 PATCH (atualizar parcial)

```tsx

// Exemplo hipotético
atualizarTitulo(id: number, titulo: string): Observable<any> {
  return this.http.patch(`${this.API}/${id}`, { titulo });
}

```

---

## 📌 Referência extra

> Artigo da Alura:
> 
> 
> https://www.alura.com.br/artigos/services-injecao-dependencia-angular-o-que-sao-como-funcionam
> 

# 🔁 6. Programação Reativa com RxJS

- **Conceitos diversos:**
    1. **Observable**:
        - Um `Observable` é uma forma de lidar com dados que podem mudar ao longo do tempo. Pense nele como uma "fonte de dados" que pode emitir valores em diferentes momentos. Você pode se inscrever (ou "assinar") para receber esses valores quando eles mudam. É muito usado em Angular para lidar com requisições assíncronas, como chamadas a APIs.
    2. **Promise**:
        - Uma `Promise` é uma maneira de lidar com operações assíncronas que podem ser concluídas no futuro. Quando você faz uma operação que pode demorar (como buscar dados de uma API), uma `Promise` é retornada. Ela pode estar em um dos três estados: pendente (ainda não concluída), resolvida (concluída com sucesso) ou rejeitada (ocorreu um erro). Você pode usar `.then()` para lidar com o resultado quando a `Promise` é resolvida e `.catch()` para lidar com erros.
    3. **Pipe**:
        - O `pipe` é um método usado em `Observables` para encadear operações. Ele permite que você aplique várias transformações aos dados que estão sendo emitidos. Por exemplo, você pode usar `pipe` para filtrar, mapear ou transformar os dados antes de usá-los. É como um encadeamento de funções que processam os dados de forma sequencial.
    4. **Map**:
        - O `map` é uma função que você pode usar dentro do `pipe` para transformar os dados que estão sendo emitidos por um `Observable`. Ele pega cada valor que chega e aplica uma função a ele, retornando um novo valor. Por exemplo, se você tiver uma lista de números e usar `map` para multiplicá-los por 2, você obterá uma nova lista com os números multiplicados.

# 🆕 7. Angular Standalone e Novidades da Versão 17+

### Input & Output

`@Input` = os inputs são uma forma dos componentes pais passarem dado para seus componentes filhos

**No filho:**

```tsx
@Component({
  selector: 'bank-account',
  template: 'bank-account.template.html'
})
class BankAccount {
  @Input() bankName: string;
  @Input('account-id') id: string;

  normalizedBankName: string;
}
```

**No pai:**

```html
<bank-account account-id="1223" bankName="Itau">
```

`@Output` = são uma forma dos componentes filhos se comunicarem com os pais

O componente filho usa a propriedade `@Output()` para gerar um evento para notificar o pai sobre a alteração. Para gerar um evento, um `@Output()` deve ter o tipo **EventEmitter**, que é uma classe em `@angular/core` que você usa para emitir eventos personalizados

**No filho:**

```tsx
@Output() newItemEvent = new EventEmitter<string>();

addNewItem(value: string) {
  this.newItemEvent.emit(value);
}
```

**No pai:**

```html
<app-item-output (newItemEvent)="addItem($event)"></app-item-output>
```

```tsx
addItem(newItem: string) {
  this.items.push(newItem);
}
```

### Lidando com imagens

A diretiva `NgOptimizedImage` foi introduzida no Angular 14. 

Essa diretiva facilitar lidar com o carregamento de imagens e implementação de estratégias para melhorar o carregamento.

```java
import { NgOptimizedImage } from '@angular/common'

...
imports: [NgOptimizedImage]
```

> Não é necessário um carregador de imagens (Image Loader) para usar o NgOptimizedImage, mas usar um com um CDN de imagem permite uma melhora poderosa de desempenho, incluindo srcsets automáticos para suas imagens.
> 

### Propriedades

- `priority = boolean`

Essa propriedade define a imagem como uma prioridade na ordem de carregamento dos demais recursos da página

- `width="400" height="200”`

Para evitar mudanças de layout relacionadas à imagem, NgOptimizedImage exige que você especifique uma altura e largura para sua imagem.

- `fill = boolean`

Nos casos em que você deseja que uma imagem preencha o tamanho do elemento que a contém (elemento pai), você pode usar o atributo fill. Isso geralmente é útil quando você deseja obter um comportamento de "background image".

- `srcset=”…”`

Definir o atributo `srcset` garante que o navegador solicite a imagem no tamanho certo para o viewport do usuário, para que não perca tempo baixando uma imagem muito grande. `NgOptimizedImage` gera um srcset apropriado para a imagem, com base na presença e no valor do atributo tamanhos na tag da imagem.

- `loading=”...”`

Por padrão, `NgOptimizedImage` define loading=lazy para todas as imagens que não estão marcadas como `priority`. Você pode desativar esse comportamento para imagens não prioritárias definindo o atributo de carregamento. 

Este atributo aceita valores: `eager`, `auto`, and `lazy`. 

`eager`
O comportamento padrão do HTML, diz ao navegador para carregar a imagem assim que o elemento <img> for processado.

`lazy`
Diz ao navegador para adiar o carregamento da imagem até que o navegador estime que ela será necessária em breve. Por exemplo, se o usuário estiver rolando pelo documento, um valor lento fará com que a imagem seja carregada pouco antes de aparecer na janela de visualização visual da janela.

### Formulários

Para criar formulários reativos no Angular 17, podemos usar o módulo `ReactiveFormsModule`

```tsx
@Component({
  selector: 'app-component',
  standalone: true,
  imports: [
    **ReactiveFormsModule**
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
```

Com esse módulo importado pelo nosso componente, podemos criar nossos `FormControl` e `FormGroup`

- **`FormControl` = Rastreia o valor e o status de validação de um input do formulário individual.**
- **`FormGroup` = Rastreia os mesmos valores e status para uma coleção de `FormControl`, ou seja, formulário com vários inputs.**
    
    ## Criando nosso forms
    
    Para criar nosso `FormGroup` devemos declarar uma propriedade na classe que representará a instância do nosso formulário, e iniciamos esse objeto `FormGroup` no construtor da classe, passando como parâmetro todos `FormControl` que pertencem ao formulário.
    
    ```tsx
    meuForms!: FormGroup;
    
      constructor() {
        this.meuForms = new FormGroup({
          nome: new FormControl('', Validators.required),
        });
      }
    ```
    
    E agora precisamos associar o Forms e os Inputs ao elementos HTML correspondentes
    
    ```html
    <form **[formGroup]="meuForms"**>
        <label for="nome">Nome</label>
        <input id="nome" **formControlName="nome"**/>
    </form>
    ```
    

### Signals

> Um signal é um wrapper em torno de um valor que notifica os consumidores interessados quando esse valor muda. Os signals podem conter qualquer valor, desde primitivos simples até estruturas de dados complexas.
> 

Então o signals é uma forma nativa do Angular para a gente criar valores que podem ser alterados, e manter o rastreio desses valores

## Como usar

Declarando um signal:

```tsx
export class HomeComponent {
	count = signal(0);
	
	...
}

const isValid = signal(false);
```

Alterando o valor

```tsx
this.count.set(1);

isValid.set(true);
```

Para ler o valor de um signal, é só chamar sua função getter, **ela permite ao Angular rastrear onde o sinal é usado.**

Então todos locais que consumirem o valor de um signal através do seu getter, avisam pro Angular que estão “ouvindo” as mudanças desse valor, e quando ele for alterado o Angular notificará esses consumidores

```tsx
count()

isValid()
```

### Recomendo essa leitura para entender mais

[Angular](https://angular.dev/guide/signals#writable-signals)

### Clientes HTTP

Para criar clientes HTTP no Angular 17 com SSR, **não iremos mais importar o módulo** `HttpClientModule` 

Devemos configurar o provider no arquivos `app.config.ts`

```tsx
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    **provideHttpClient(withFetch())**
  ]
};
```

E agora conseguimos injetar o serviço HttpClient como uma dependência dos nossos componentes, serviços ou outras classes:

```tsx
@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private endpointUrl = 'https://faed47pcwb7biktidlecuafuty0aegep.lambda-url.us-east-1.on.aws/';

  constructor(**private http: HttpClient**) { }

  sendData(name: string, email: string): Observable<NewsletterResponse> {
    const body = { name, email };
    return this.http.post<NewsletterResponse>(this.endpointUrl, body);
  }
}
```

### Usando services

Para usar services nos nossos standalone components, devemos adicionar o array de `providers` no nosso componente

```tsx
@Component({
  selector: 'app-component',
  standalone: true,
  imports: [
    ...
  ],
  providers: [
    **seuService**
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
```