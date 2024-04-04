import { Directive, ElementRef, AfterViewInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRequired]'
})
export class RequiredDirective implements AfterViewInit {
  @Input() borderProperties: string = '1px solid #EF7DA0';

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const wrapper = this.el.nativeElement;
    const label = wrapper.querySelector('label');
    const input = wrapper.querySelector('input');

    if (label) {
      label.textContent += ' *';
    }

    if (input) {
      this.checkInputValidity(input);
    }
  }

  @HostListener('input', ['$event.target'])
  onInput(input: HTMLElement) {
    this.checkInputValidity(input);
  }

  private checkInputValidity(input: HTMLElement) {
    if (input.classList.contains('ng-invalid') && input.classList.contains('ng-dirty')) {
      input.style.border = this.borderProperties;
    } else {
      input.style.border = '';
    }
  }
}
