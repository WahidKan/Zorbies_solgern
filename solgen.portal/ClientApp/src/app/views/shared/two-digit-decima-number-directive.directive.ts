import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTwoDigitDecimaNumberDirective]'
})
export class TwoDigitDecimaNumberDirectiveDirective {
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keypress', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
   
    }
  }



  //@HostListener('paste', ['$event'])
  //blockPaste(e: ClipboardEvent) {
  //  let clipboardData = e.clipboardData;
  //  let pastedText = clipboardData.getData('text');
  //  if (pastedText.includes("\n")) {
  //    event.preventDefault();
  //  }
  //  let current: string = this.el.nativeElement.value;
  //  let position = this.el.nativeElement.selectionStart;
  //  for (var i = 0; i < pastedText.length; i++) {
  //    const next: string = [current.slice(0, position), pastedText[i] == 'Decimal' ? '.' : pastedText[i], current.slice(position)].join('');
  //    current = current.concat(pastedText[i]);
  //    position += 1
  //    if (next && !String(next).match(this.regex)) {
  //      event.preventDefault();
  //    }
  //  }
   
  //}
   
 
}
