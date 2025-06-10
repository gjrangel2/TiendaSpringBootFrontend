import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Importa Observable para manejar flujos de datos asíncronos
import { environment } from 'src/environments/environment.prod';

// Define la interfaz para Cliente, que coincide con tu modelo de Spring Boot
export interface Producto {
  id?: number; // El '?' indica que es opcional, ya que el ID lo genera el backend
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;

}

@Injectable({
  providedIn: 'root' // Indica que este servicio estará disponible en toda la aplicación
})
export class ProductoService {

  private apiUrl = environment.apiUrl +'/productos'; 
  constructor(private http: HttpClient) { } // Inyecta HttpClient en el constructor

  // Método para obtener todos los productos
  obtenerTodosLosProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Método para obtener un producto por ID
  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Método para crear un nuevo producto
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  // Método para actualizar un producto existente
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  // Método para eliminar un producto
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}