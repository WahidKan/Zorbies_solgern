import { Component, OnInit, Input, OnChanges } from '@angular/core';

declare var google: any;
@Component({
  selector: 'app-goolemap',
  templateUrl: './goolemap.component.html',
  styleUrls: ['./goolemap.component.scss']
})
export class GoolemapComponent implements OnInit, OnChanges {
  
  @Input('location') location: any;

  options: any;
  overlays: any[];
  address: any;
  geocoder: any;
  lat: any;
  lng: any;
  loadSave = false;

  ngOnChanges() {

    this.options = {
    };

    this.overlays = [
    ];


    if (this.location != null || this.location != undefined)
      this.findLocation(this.location);
  }

  ngOnInit() {
    this.options = {
      center: { lat: 47.751076, lng: -120.740135 },
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.overlays = [];

  }  

  findLocation(address:any) {
    this.overlays = [];
    if (address != null || address != undefined) {
      this.address = address;
    }

    this.loadSave = true;
    this.lat ='';
    this.lng = '';
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': this.address
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {

        if (results[0].geometry.location) {
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();

          this.overlays.push(new google.maps.Marker({ position: { lat: this.lat, lng: this.lng }, title: this.address, animation: google.maps.Animation.DROP }));
          this.address = '';
          //let map1 = google.maps.Map;
          //map1.se


          //this.options.center(this.lat, this.lng);
          //event.maps.setCenter(this.lat, this.lng);
          //marker.setCenter(this.lat, this.lng);
          //google.maps.panBy( this.lat, this.lng);
          //google.maps.setCenter(this.lat, this.lng);
        }

      } else {
        alert("Sorry, this search produced no results.");
      }
        this.loadSave = false;
    })
    this.loadSave = false;
  }
}
