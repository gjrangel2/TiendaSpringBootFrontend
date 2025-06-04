import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from './services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Gestión de Clientes';
  clientes: Cliente[] = [];
  clienteEnEdicion: Cliente = { nombre: '', apellido: '', email: '' }; // ESTO ES NUEVO
  // nuevoCliente: Cliente = { nombre: '', apellido: '', email: '' }; // YA NO NECESITAS ESTA
  clienteSeleccionado: Cliente | null = null; // Mantenemos este para saber si estamos editando o creando
  mensajeError: string | null = null;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.obtenerTodosLosClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.mensajeError = null;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
        this.mensajeError = 'No se pudieron cargar los clientes. Asegúrate de que el backend esté funcionando.';
      }
    });
  }

  // Este método ahora se encargará de crear o actualizar
  guardarCliente(): void {
    this.mensajeError = null;

    if (this.clienteEnEdicion.id) { // Si tiene ID, estamos actualizando
      this.clienteService.actualizarCliente(this.clienteEnEdicion.id, this.clienteEnEdicion).subscribe({
        next: (clienteActualizado) => {
          const index = this.clientes.findIndex(c => c.id === clienteActualizado.id);
          if (index > -1) {
            this.clientes[index] = clienteActualizado;
          }
          alert('Cliente actualizado con éxito!');
          this.resetFormulario(); // Limpia el formulario
        },
        error: (err) => {
          console.error('Error al actualizar cliente:', err);
          this.mensajeError = 'Error al actualizar el cliente. Verifica los datos.';
        }
      });
    } else { // Si no tiene ID, estamos creando
      this.clienteService.crearCliente(this.clienteEnEdicion).subscribe({
        next: (cliente) => {
          this.clientes.push(cliente);
          alert('Cliente creado con éxito!');
          this.resetFormulario(); // Limpia el formulario
        },
        error: (err) => {
          console.error('Error al crear cliente:', err);
          this.mensajeError = 'Error al crear el cliente. Verifica los datos.';
        }
      });
    }
  }

  seleccionarClienteParaEditar(cliente: Cliente): void {
    // Asignamos una copia del cliente a clienteEnEdicion para que el formulario lo muestre
    this.clienteEnEdicion = { ...cliente };
    this.clienteSeleccionado = cliente; // Mantenemos clienteSeleccionado para el título del formulario y el botón Cancelar
    this.mensajeError = null;
  }

  eliminarCliente(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID del cliente no definido para eliminar.');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      this.mensajeError = null;
      this.clienteService.eliminarCliente(id).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(cliente => cliente.id !== id);
          alert('Cliente eliminado con éxito!');
          this.resetFormulario(); // Por si se estaba editando el cliente que se eliminó
        },
        error: (err) => {
          console.error('Error al eliminar cliente:', err);
          this.mensajeError = 'Error al eliminar el cliente. Es posible que esté asociado a un pedido.';
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.resetFormulario(); // Llama a la nueva función de reseteo
  }

  // Nueva función para resetear el formulario y el estado
  resetFormulario(): void {
    this.clienteEnEdicion = { nombre: '', apellido: '', email: '' };
    this.clienteSeleccionado = null;
    this.mensajeError = null;
  }
}