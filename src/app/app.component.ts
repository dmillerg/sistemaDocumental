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
 
      document.querySelectorAll(".text-oscuro").forEach((e)=>{
        e.classList.remove("text-oscuro");
        e.classList.add("text-ligth");
      })
    }else{
      document.querySelectorAll(".dark").forEach((e)=>{
        e.classList.remove("dark");
        e.classList.add("ligth");
      })
      document.querySelectorAll(".text-ligth").forEach((e)=>{
        e.classList.remove("text-ligth");
        e.classList.add("text-oscuro");
      })
    }
    this.mode = !this.mode;
  }
  
}
