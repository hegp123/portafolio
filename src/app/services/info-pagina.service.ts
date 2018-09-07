import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];
  constructor(private http: HttpClient) {
    this.cargaInfo();
    this.cargaEquipo();
  }

  private cargaInfo() {
    //leer archivo json
    this.http.get("assets/data/data-pagina.json").subscribe((resp: InfoPagina) => {

      //console.log(resp['twitter']);
      this.cargada = true;
      this.info = resp;
      
    });
  }

  private cargaEquipo() {
    this.http.get("https://angular-html-1b339.firebaseio.com/equipo.json").
      subscribe((resp:any) => {
        this.equipo = resp;
        
      });
  }
}
