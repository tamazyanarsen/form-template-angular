import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tsc-ui-switch',
  templateUrl: './ui-switch.component.html',
  styleUrls: ['./ui-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UiSwitchComponent,
    multi: true
  }]
})
export class UiSwitchComponent implements ControlValueAccessor {
  @Input() label = '';

  value: unknown = false;

  onChange = (value: unknown) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  changeValue(event: boolean): void {
    this.markAsTouched();
    if (!this.disabled) {
      this.value = event;
      this.onChange(this.value);
    }
  }

  writeValue(value: boolean) {
    this.value = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

}
