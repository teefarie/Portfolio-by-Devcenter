import {Component, Input, OnInit, forwardRef} from '@angular/core'
import {AppService} from "../../../app.service";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RatingDirective),
  multi: true
};

@Component({
  selector: 'rating',
  template: `<div class="stars" [class.disabled]="disabled">
                  <ul>
                    <input type="hidden" [(ngModel)]="initValue" #input (blur)="onBlur()" [required]="required" />
                    <li *ngFor="let star of starCollection; let index = index">
                    <a (mouseover)="over(index + 1)" 
                               (mouseout)="out(index + 1)"
                               (click)="clicked(index + 1)">
                      <img src="../../../assets/img/fade-star.svg" *ngIf="overed < (index + 1)" height="19px">
                      <img src="../../../assets/img/star.svg" *ngIf="overed >= (index + 1)" height="19px">
                    </a>
                    </li>
                  </ul>
                </div>`,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})

export class RatingDirective implements ControlValueAccessor, OnInit {
  @Input() count: number;
  starCollection: number[] = [];
  @Input() overed: number = 0;
  @Input("init-value") initValue: number;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  constructor(private _appService: AppService) {
  }

  ngOnInit() {
    this.overed = (this.initValue == null) ? 0 : this.initValue;
    this.count = (this.count == null) ? 1 : this.count;
    for (let i = 0; i < this.count; i++) {
      this.starCollection.push(i);
    }
  }

  over(index: number) {
    if (!this.disabled) this.overed = index;

  }

  out(index: number) {
    if (!this.disabled) this.overed = (this.initValue == null || this.initValue == 0) ? 0 : this.initValue;
  }

  clicked(index: number) {
    this.initValue = index;
    this.innerValue = index;
    this.onChangeCallback(index);
  }

  /*
   * Form Controller */
  //The internal data model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};

  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
