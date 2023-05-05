import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchastypeService } from './searchastype.service';
import { MasterItems } from '../../manageuser/addedituser.service';

@Component({
  selector: 'app-search-as-type',
  templateUrl: './search-as-type.component.html',
  styles: []
})
export class SearchAsTypeComponent implements OnInit {
  @Output() onIdPicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private searchAsTypeService: SearchastypeService) { }

  ngOnInit() {
  }
  
  results: MasterItems = new MasterItems();

  search(event) {
    this.searchAsTypeService.getSearchResult(event.query).subscribe((result:any) => { 
      this.results = result;
    });
  }

  selectedRecord(event) {
    this.pickDate(event.value);
  }

  public pickDate(id: any): void {
    this.onIdPicked.emit(id);
  }
}
