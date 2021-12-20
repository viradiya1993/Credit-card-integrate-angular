import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defer } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditCard, CreditCardValidators } from './angular-cc-library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public demoForm: FormGroup;
  public submitted = false;

  public type$ = defer(() => this.demoForm.get('creditCard')?.valueChanges)
    .pipe(map((num: string) => CreditCard.cardType(num)));

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.demoForm = this.fb.group({
      creditCard: ['', [CreditCardValidators.validateCCNumber]],
      expDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    });
  }

  public goToNextField(controlName: string, nextField: HTMLInputElement) {
    if (this.demoForm.get(controlName)?.valid) {
      nextField.focus();
    }
  }

  public onSubmit(demoForm: FormGroup) {
    this.submitted = true;
    console.log(demoForm.value);
  }
  
}
