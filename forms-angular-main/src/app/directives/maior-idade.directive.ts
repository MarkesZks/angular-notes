import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[maiorIdadeValidator]', //Nome da diretiva
  providers: [{
    provide: NG_VALIDATORS, //Permite que a diretiva seja usada como um validador
    useExisting: MaiorIdadeDirective, //Referência para a própria diretiva
    multi: true //Permite que a diretiva seja usada em conjunto com outras diretivas
  }] 
})
export class MaiorIdadeDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const dataNascimento = control.value;
    const AnoNascimento = new Date(dataNascimento).getFullYear(); 
    const AnoNascMais18 = AnoNascimento + 18;
    const AnoAtual = new Date().getFullYear();
    const ehMaiorIdate = AnoNascMais18 <= AnoAtual;

    return ehMaiorIdate ? null : { 'maiorIdadeValidator': true };
    
  }

}
