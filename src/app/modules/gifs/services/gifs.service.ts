import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey :string = 'UC1rk0FpF6stB3wN2CDpKjuMzM3VcAtQ';
  private _historial: string[] = [];
  public resultados:any[] = [];

  get historial(){
    return [...this._historial];
  }


  constructor(private http:HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }


  buscarGifs(query:string){

    query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
      
      

    }
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=UC1rk0FpF6stB3wN2CDpKjuMzM3VcAtQ&q=${query}&limit=10`)
    .subscribe((resp:any) =>{
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
      
      
    })
    
  }

  
}
