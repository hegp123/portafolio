import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-1b339.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.producto = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  public getProducto(id: String) {
    return this.http.get(`https://angular-html-1b339.firebaseio.com/productos/${id}.json`);
  }

  public buscarProducto(termino: string) {
    if (this.producto.length === 0) {
      this.cargarProductos().then(() => {
        //ejecutar despues de tener los productos
        //aplicar filtro
        this.filtrarProducto(termino);
      });
    } else {
      //aplicar filtro
      this.filtrarProducto(termino);
    }


  }

  private filtrarProducto(termino: string) {
    this.productosFiltrados = [];
    termino = termino.toUpperCase();
    this.producto.forEach(prod => {
      if (prod.categoria.toLocaleUpperCase().indexOf(termino) >= 0 || prod.titulo.toLocaleUpperCase().indexOf(termino) >= 0) {
        this.productosFiltrados.push(prod);
      }
    });
    console.log(this.productosFiltrados);
  }
}
