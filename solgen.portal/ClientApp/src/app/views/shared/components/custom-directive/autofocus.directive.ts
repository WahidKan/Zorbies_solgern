import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  @Input('appAutofocus') focus : boolean;
  constructor(private el: ElementRef) {

 }
  ngOnInit(): void {
    if(this.focus){
      this.el.nativeElement.focus();
    }
  }
}
