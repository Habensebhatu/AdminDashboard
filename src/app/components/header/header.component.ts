import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private observer: BreakpointObserver) { }
  isSidenavCollapsed = false;
  isSidenavSmallerScreen = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  ngOnInit() {}

  ngAfterViewInit() {
    this.observer.observe([
      '(max-width: 800px)'
    ]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.close();
        this.isSidenavSmallerScreen = !this.isSidenavSmallerScreen;
      } else {
        this.sidenav.open();
      }
    });
  }

  toggleSidenav() {
    this.isSidenavCollapsed = !this.isSidenavCollapsed;
    if(this.isSidenavSmallerScreen){
      this.sidenav.toggle();
    }
  }
  
}
