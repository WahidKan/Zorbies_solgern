import { Component, Input, OnInit } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-locationmap',
  templateUrl: './locationmap.component.html',
  styleUrls: ['./locationmap.component.scss']
})
export class LocationmapComponent implements OnInit {

  @Input('location') location: any;

  options: any;
  overlays: any[];
  address: any;
  geocoder: any;
  lat: any;
  lng: any;
  loadSave = false;

  ngOnChanges() {
   this.findLocation(this.location);
  }

  ngOnInit() {}

  findLocation(address:any) {
    ;
    try{
      this.loadSave = true;
      this.location = JSON.parse(address);
      this.options = {
        center: { lat: this.location.lat, lng: this.location.lng },
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.overlays = [
      ];
      this.overlays.push(new google.maps.Marker({ position: { lat: this.location.lat, lng: this.location.lng }, title: '', animation: google.maps.Animation.DROP }));
      this.loadSave = false;
    }catch{
      this.loadSave = false;
    }
   
  }
}
