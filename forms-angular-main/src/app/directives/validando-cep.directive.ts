import { ConsultaCepService } from './../service/consulta-cep.service';
import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Directive({
  selector: '[validadorCep]',
  providers: [{
        provide: NG_ASYNC_VALIDATORS,
        useExisting: ValidandoCepDirective,
        multi:true
  }]
})
export class ValidandoCepDirective implements AsyncValidator {

  constructor(private consultaCepService: ConsultaCepService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;
    return this.consultaCepService.getConsultaCep(cep).pipe(map(
      (result:any)=>result.erro ? {'validadorCep': true} : null      
      )
    )



    
  }

  }
