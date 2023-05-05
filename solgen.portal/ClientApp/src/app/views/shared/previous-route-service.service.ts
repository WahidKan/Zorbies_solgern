import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PreviousRouteServiceService {

  private previousUrl: string;
  private currentUrl: string;
  constructor(private router: Router) {

    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // console.log("event", event);

        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });

    this.router.events.pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise()).subscribe((events: RoutesRecognized[]) => {
      // console.log('previous url', events[0].urlAfterRedirects);
      // console.log('current url', events[1].urlAfterRedirects);
      this.previousUrl = events[0].urlAfterRedirects;
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
