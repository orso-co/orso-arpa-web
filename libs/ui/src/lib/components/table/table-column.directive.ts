import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[arpaTableColumn]',
  standalone: true,
})
export class ArpaTableColumnDirective {
  @Input('arpaTableColumn')
  name = '';

  constructor(public template: TemplateRef<unknown>) {}
}
