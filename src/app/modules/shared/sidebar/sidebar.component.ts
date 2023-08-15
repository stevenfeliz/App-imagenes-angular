import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  

})
export class SidebarComponent {

  constructor(private gifsService:GifsService){

  }

  get historial(){
    return this.gifsService.historial
  }
  
  selecion(item:any){
    console.log(item)

    this.gifsService.buscarGifs(item);
  }
 
  delete(event:any){
   const data = event.target.id
   let localStorageData = localStorage.getItem('historial')

   if (localStorageData !== null) {
    // Paso 1: Convierte los datos en un array
    let dataArray: string[] = JSON.parse(localStorageData);

    let nuevoArray = dataArray.filter(valor => valor !== data);

   
    localStorage.setItem('historial', JSON.stringify(nuevoArray));

    window.location.reload();
   
   }
  }
}