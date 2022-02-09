import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  sidenav: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    let toggle = document.getElementById("sidenav");
    if (toggle?.classList.contains("sidenavk-active")) {
      toggle?.classList.remove("sidenavk-active");
      this.sidenav = false;
    } else {
      toggle?.classList.add("sidenavk-active");
      this.sidenav = true;
    }
  }
}
