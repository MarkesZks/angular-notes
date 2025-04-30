import { ConsultaCepService } from "./../service/consulta-cep.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  name: String = "";

  constructor(
    private router: Router,
    private consultaCepService: ConsultaCepService
  ) {}

  ngOnInit(): void {}

  cadastrar(form: NgForm) {
    if (form.valid) {
      this.router.navigate(["./sucesso"]);
    } else {
      alert("Formulario invalido!");
    }
    console.log(form.controls);
  }

  consultaCep(ev: any, f:NgForm) {
    const cep = ev.target.value;
    if(cep !== ''){
      this.consultaCepService.getConsultaCep(cep).subscribe((result) => {
        this.populandoEndereco(result,f)
      });
    }}
    populandoEndereco(dados:any,f:NgForm){
      //patchValue() -> Atualizar partes de um formulário. Como funciona: Você passa um objeto com os campos que deseja atualizar e seus novos valores.
      f.form.patchValue({
        endereco: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      })
    }
  
}
