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

  }


  buscarGifs(query:string){

    query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

    }
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=UC1rk0FpF6stB3wN2CDpKjuMzM3VcAtQ&q=${query}&limit=10`)
    .subscribe((resp:any) =>{
      this.resultados = resp.data;
      
    })
    console.log(this.resultados)
  }

  
}
