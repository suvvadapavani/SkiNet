import { Component, Input, Self } from '@angular/core';
import { NgControl, FormControl, ReactiveFormsModule, ControlValueAccessor } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatLabel } from '@angular/material/select';

@Component({
  selector: 'app-text-input',
  imports: [
       MatFormField,
    MatInput,
    MatError,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent implements ControlValueAccessor {
   @Input() label = '';
    @Input() type = 'text';

    //prevent from resuing the another control directive that we are injecting
    constructor(@Self() public controlDir: NgControl) {
      this.controlDir.valueAccessor = this;
    }

    writeValue(obj: any): void {
    }

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    get control() {
      return this.controlDir.control as FormControl;
    }
}
