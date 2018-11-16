import { Component, OnInit } from '@angular/core';
import { FixerServiceService } from "./services/fixer-service.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  convertForm:FormGroup;  
  Rates: any = [];
  output = false;
  inputValue;
  outputValue;
  inputCur = '';
  outputCur = '';
  constructor(public rest: FixerServiceService, private formBuilder: FormBuilder) {}
  
  ngOnInit() {
    // from builder
    this.convertForm = this.formBuilder.group({
      inputValue: ['', [Validators.required, Validators.minLength(1)]],
      inputCur: ['', Validators.required],
      outputCur: ['', Validators.required]
    });
  }
  onSubmit() {
    // stop here if form is invalid
    if (this.convertForm.invalid) {
      alert('Enter All Values...!');
    }
    // making sure Rates array is empty
    this.Rates = [];
    // accessing service method
    this.rest.getRates().subscribe((data: {}) => {
      this.Rates = data['rates'];
      this.doCalulation();
    });

  }

  doCalulation() {
    // getting form values
    let values = this.convertForm.value;
    // setting values for output
    this.inputValue = values['inputValue'];
    this.inputCur = values['inputCur'];
    this.outputCur = values['outputCur'];

    // converting currency
    if (values['inputCur'] == 'USD') {
      this.outputValue = values['inputValue'] / this.Rates.USD;
      if (values['outputCur'] == 'AUD') {
        this.outputValue = this.outputValue * this.Rates.AUD;
      }
      this.output = true;
    }
    else if (values['inputCur'] == 'AUD') {
      this.outputValue = values['inputValue'] / this.Rates.AUD;
      if (values['inputCur'] == 'USD') {
        this.outputValue = this.outputValue * this.Rates.USD;
      }
      this.output = true;
    }
  }
}
