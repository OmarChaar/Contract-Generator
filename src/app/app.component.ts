import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('drawer') drawer!: MatDrawer;

  title = '';
  currentURL = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationEnd) {
        console.log("event.url", event.url);
        if(event.url == '/clients') {
          this.title = 'clients';
        }
        else if(event.url == '/collection') {
          this.title = 'collection'
        }
        else if(event.url == '/') {
          this.title = 'contract generator'
        }

        this.currentURL = event.url;
      }
    })
  }

  navigateTo(url: any) {
    this.router.navigate([url]);
    this.drawer.close();
  }

}
