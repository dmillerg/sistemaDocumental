import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{

  mode: boolean = false;
  title = 'sistema-documental';

  ngOnInit(): void {
    
  }

  themeChange(){
    if(this.mode){
      document.querySelectorAll(".ligth").forEach((e)=>{
        e.classList.remove("ligth");
        e.classList.add("dark");
      })
    }else{
      document.querySelectorAll(".dark").forEach((e)=>{
        e.classList.remove("dark");
        e.classList.add("ligth");
      })
    }
    this.mode = !this.mode;
  }
  
}
