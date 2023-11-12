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
  productosfiltrado: Producto[] = [];


  constructor( private http: HttpClient) {
    this.cargarProductos();
   }

   private cargarProductos() {

    return new Promise<void>((resolve, reject) => {
      this.http.get<any[]>('https://angular-html-7da05-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe(
        (resp: Producto[]) => {
          this.cargando = false;
          this.producto = resp;
          resolve();
        }
      );
    })

    
  }
  getProducto(id: string){
    return this.http.get(`https://angular-html-7da05-default-rtdb.firebaseio.com/productos/${id}.json`)
  }

  buscarProducto(termino: string){

    if(this.producto.length === 0){
      this.cargarProductos().then( ()=>{
            this.filtrarProductos(termino)
      })
    }else{
      this.filtrarProductos(termino)

    }
  }

  private filtrarProductos(termino: string){
    termino = termino.toLocaleLowerCase();
    this.productosfiltrado = [];
      this.producto.forEach(prod => {
        const tituloLower = prod.titulo.toLocaleLowerCase();
         if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
          this.productosfiltrado.push(prod);
         }
      })
  }
}
