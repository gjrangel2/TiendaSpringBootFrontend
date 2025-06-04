import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Importa Observable para manejar flujos de datos asíncronos

// Define la interfaz para Cliente, que coincide con tu modelo de Spring Boot
export interface Cliente {
  id?: number; // El '?' indica que es opcional, ya que el ID lo genera el backend
  nombre: string;
  apellido: string;
  email: string;
}

@Injectable({
  providedIn: 'root' // Indica que este servicio estará disponible en toda la aplicación
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/api/clientes'; // URL base de tu API de Clientes de Spring Boot

  constructor(private http: HttpClient) { } // Inyecta HttpClient en el constructor

  // Método para obtener todos los clientes
  obtenerTodosLosClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // Método para obtener un cliente por ID
  obtenerClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // Método para crear un nuevo cliente
  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  // Método para actualizar un cliente existente
  actualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  // Método para eliminar un cliente
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}