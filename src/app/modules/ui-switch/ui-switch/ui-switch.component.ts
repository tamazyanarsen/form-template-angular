import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tsc-ui-switch',
  templateUrl: './ui-switch.component.html',
  styleUrls: ['./ui-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiSwitchComponent {
  @Input() label = '';

  @Input() value: unknown = false;
  @Output() valueChange = new EventEmitter<unknown>();

  constructor() {}

}
