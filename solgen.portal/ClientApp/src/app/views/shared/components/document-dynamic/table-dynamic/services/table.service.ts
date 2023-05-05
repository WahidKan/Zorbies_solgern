import { EventEmitter, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor() {}
  onRowAdd = new EventEmitter();
  onColumnAdd = new EventEmitter();
}
