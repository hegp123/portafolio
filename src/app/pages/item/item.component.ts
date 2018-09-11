import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';
import { Producto } from '../../interfaces/producto.interface';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion;
  id: string;
  constructor(private route: ActivatedRoute, public productServices: ProductosService) {

  }

  ngOnInit() {
    this.route.params.subscribe(parametro => {
      this.productServices.getProducto(parametro['id'])
        .subscribe((producto: ProductoDescripcion) => {
          this.id = parametro['id'];
          this.producto = producto;
          console.log(this.producto);
        });
    });
  }

}
