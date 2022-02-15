import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    document.querySelector('.sidebar')?.classList.toggle('active');
    document.querySelector('.gg')?.classList.toggle('active');
  }
}
