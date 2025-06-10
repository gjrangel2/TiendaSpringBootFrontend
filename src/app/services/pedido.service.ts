// src/app/services/pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


// Definición de la interfaz Pedido (ajustada para el frontend)
export interface Pedido {
  id: number | null;
  fechaPedido: string; // Usaremos string para ISO 8601 (ej. '2025-06-06T10:30:00')
  estado: string;
  cliente: { id: number; nombre: string; apellido: string } | null; // El cliente completo
  productos: { id: number; nombre: string; precio: number }[]; // Lista de productos
  total: number;
}

// Interfaz para el payload que se envía al backend al crear/actualizar un pedido
// Asume que el backend espera el ID del clienthsdfe y una lista de IDs de productos.
export interface PedidoPayload {
  id: number | null;
  fechaPedido: string;
  estado: string;
  clienteId: number; // Solo el ID del cliente
  productosIds: number[]; // Solo los IDs de los productos
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  // Asegúrate de que el endpoint sea correcto para tu API de pedidos en Spring Boot
  private apiUrl = environment.apiUrl + '/pedidos';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los pedidos del backend.
   * @returns Un Observable con la lista de pedidos.
   */
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Crea un nuevo pedido en el backend.
   * @param pedidoPayload El objeto PedidoPayload a crear.
   * @returns Un Observable con el pedido creado.
   */
  createPedido(pedidoPayload: PedidoPayload): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedidoPayload).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Actualiza un pedido existente en el backend.
   * @param id El ID del pedido a actualizar.
   * @param pedidoPayload El objeto PedidoPayload con los datos actualizados.
   * @returns Un Observable con el pedido actualizado.
   */
  updatePedido(id: number, pedidoPayload: PedidoPayload): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedidoPayload).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Elimina un pedido del backend.
   * @param id El ID del pedido a eliminar.
   * @returns Un Observable que indica la finalización de la operación.
   */
  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Maneja los errores de las peticiones HTTP.
   * @param error El objeto de error HTTP.
   * @returns Un Observable que emite un error.
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
