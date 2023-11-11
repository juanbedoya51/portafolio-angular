import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  cargando = true;
  producto: Producto[] = [];


  constructor( private http: HttpClient) {
    this.cargarProductos();
   }

   private cargarProductos(): void {
    this.http.get<any[]>('https://angular-html-7da05-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe(
        (resp: Producto[]) => {
          this.cargando = false;
          this.producto = resp;
        },
        (error: any) => {
          // Manejar errores
          console.error(error);
        }
      );
  }
}
