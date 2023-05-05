import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol, CurrencyPipe } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';

@Pipe({
  name: 'MyCurrencyPipe'
})
export class CurrencyPipePipe implements PipeTransform {

  //transform(value: any, args?: any): any {
  //  return null;
  //}
  constructor(
    private cp: CurrencyPipe
  ) { }
  transform(
    value: string,
    currencyCode: string = 'USD',
    display: string = 'code',
    digitsInfo: string = '3.2-2',
    locale: string = 'en',
  ): string | null {
 
    return formatCurrency(
      parseFloat(value),
      locale,
      getCurrencySymbol(currencyCode, 'wide'),
      currencyCode,
      
    );
  
  }
}
