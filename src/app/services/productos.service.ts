import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://angular-html-1b339.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) => {
        this.producto = resp;
        this.cargando = false;
      });
  }

  public getProducto(id: String){
    return this.http.get(`https://angular-html-1b339.firebaseio.com/productos/${id}.json`);
  }
}
