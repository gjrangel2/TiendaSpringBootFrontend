// src/app/pedido/pedido.component.ts
import { Component, OnInit } from '@angular/core';
import { Pedido, PedidoService, PedidoPayload } from 'src/app/services/pedido.service';
import { Cliente, ClienteService } from '../services/cliente.service';
import { Producto, ProductoService } from '../services/producto.service';
import { forkJoin } from 'rxjs'; // Para cargar múltiples observables al mismo tiempo

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  clientes: Cliente[] = [];
  productosDisponibles: Producto[] = []; // Todos los productos para el select
  // Estado para el formulario de pedido (para crear/editar)
  pedidoForm: PedidoPayload = {
    id: null,
    fechaPedido: new Date().toISOString().slice(0, 16), // Formato YYYY-MM-DDTHH:mm
    estado: 'PENDIENTE',
    clienteId: 0, // ID del cliente seleccionado
    productosIds: [], // IDs de los productos seleccionados
    total: 0,
 
  };
  mensajeError: string | null = null;
  selectedProductsForForm: number[] = []; // IDs de productos seleccionados para el formulario (para el multi-select)


  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    // Carga pedidos, clientes y productos disponibles en paralelo
    forkJoin({
      pedidos: this.pedidoService.getPedidos(),
      clientes: this.clienteService.obtenerTodosLosClientes(),
      productos: this.productoService.obtenerTodosLosProductos()
    }).subscribe({
      next: (data) => {
        this.pedidos = data.pedidos;
        this.clientes = data.clientes;
        this.productosDisponibles = data.productos;
        console.log('Datos iniciales cargados:', data);
      },
      error: (err) => {
        this.mensajeError = 'Error al cargar los datos iniciales: ' + (err.message || 'Error desconocido');
        console.error('Error al cargar datos iniciales:', err);
      }
    });
  }

  // Carga solo los pedidos (útil después de crear/actualizar/eliminar)
  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.mensajeError = null;
      },
      error: (err) => {
        this.mensajeError = 'Error al cargar pedidos: ' + (err.message || 'Error desconocido');
        console.error('Error al cargar pedidos:', err);
      }
    });
  }

  // Guarda un nuevo pedido o actualiza uno existente
  guardarPedido(): void {
    // Validaciones básicas
    if (!this.pedidoForm.clienteId || this.pedidoForm.productosIds.length === 0 || !this.pedidoForm.estado) {
      this.mensajeError = 'Por favor, complete todos los campos obligatorios y seleccione al menos un producto.';
      return;
    }

    // Asegurarse de que el total se calcule antes de guardar
    this.calcularTotalPedido();

    if (this.pedidoForm.id) {
      // Actualizar
      this.pedidoService.updatePedido(this.pedidoForm.id, this.pedidoForm).subscribe({
        next: () => {
          this.cargarPedidos();
          this.resetFormulario();
          console.log('Pedido actualizado con éxito.');
        },
        error: (err) => {
          this.mensajeError = 'Error al actualizar pedido: ' + (err.message || 'Error desconocido');
          console.error('Error al actualizar pedido:', err);
        }
      });
    } else {
      // Crear
      this.pedidoService.createPedido(this.pedidoForm).subscribe({
        next: () => {
          this.cargarPedidos();
          this.resetFormulario();
          console.log('Pedido creado con éxito.');
        },
        error: (err) => {
          this.mensajeError = 'Error al crear pedido: ' + (err.message || 'Error desconocido');
          console.error('Error al crear pedido:', err);
        }
      });
    }
  }

  // Selecciona un pedido para editar, rellenando el formulario
  seleccionarPedidoParaEditar(pedido: Pedido): void {
    this.pedidoForm = {
      id: pedido.id,
      fechaPedido: pedido.fechaPedido.slice(0, 16), // Asegura el formato correcto
      estado: pedido.estado,
      clienteId: pedido.cliente?.id || 0, // Asigna el ID del cliente
      productosIds: pedido.productos.map(p => p.id), // Extrae los IDs de los productos
      total: pedido.total
    };
    this.selectedProductsForForm = pedido.productos.map(p => p.id); // Para el ngModelOptions
    console.log('Pedido seleccionado para edición:', this.pedidoForm);
  }

  // Elimina un pedido
  eliminarPedido(id: number | null): void {
    if (id === null) {
      console.error('No se puede eliminar un pedido con ID nulo.');
      return;
    }
    if (confirm('¿Estás seguro de que quieres eliminar este pedido?')) {
      this.pedidoService.deletePedido(id).subscribe({
        next: () => {
          this.cargarPedidos();
          console.log('Pedido eliminado con éxito.');
          this.mensajeError = null;
        },
        error: (err) => {
          this.mensajeError = 'Error al eliminar pedido: ' + (err.message || 'Error desconocido');
          console.error('Error al eliminar pedido:', err);
        }
      });
    }
  }

  // Resetea el formulario a su estado inicial
  resetFormulario(): void {
    this.pedidoForm = {
      id: null,
      fechaPedido: new Date().toISOString().slice(0, 16),
      estado: 'PENDIENTE',
      clienteId: 0,
      productosIds: [],
      total: 0
    };
    this.selectedProductsForForm = []; // Limpiar selección del multi-select
    this.mensajeError = null;
  }

  // Calcula el total del pedido basado en los productos seleccionados hsdffh
  calcularTotalPedido(): void {
    let calculatedTotal = 0;
    for (const prodId of this.pedidoForm.productosIds) {
      const producto = this.productosDisponibles.find(p => p.id === prodId);
      if (producto) {
        calculatedTotal += producto.precio;
      }
    }
    this.pedidoForm.total = calculatedTotal;
  }

  // Helper para obtener el nombre completo del cliente por ID
  getClienteNombre(clienteId: number | null): string {
    if (!clienteId) return 'N/A';
    const cliente = this.clientes.find(c => c.id === clienteId);
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Desconocido';
  }

  // Helper para obtener los nombres de los productos por sus IDs
  getProductosNombres(productos: { id: number; nombre: string; }[]): string {
    if (!productos || productos.length === 0) return 'Ninguno';
    return productos.map(p => p.nombre).join(', ');
  }
}
