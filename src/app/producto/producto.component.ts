import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  title = 'Gestión de Productos';
  productos: Producto[] = [];
  productoEnEdicion: Producto = { nombre: '', descripcion: '', precio: 0, stock: 0}; // ESTO ES NUEVO
  // nuevoCliente: Cliente = { nombre: '', apellido: '', email: '' }; // YA NO NECESITAS ESTA
  productoSeleccionado: Producto | null = null; // Mantenemos este para saber si estamos editando o creando
  mensajeError: string | null = null;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.mensajeError = null;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        this.mensajeError = 'No se pudieron cargar los productos. Asegúrate de que el backend esté funcionando.';
      }
    });
  }

  // Este método ahora se encargará de crear o actualizar
  guardarProducto(): void {
    this.mensajeError = null;

    if (this.productoEnEdicion.id) { // Si tiene ID, estamos actualizando
      this.productoService.actualizarProducto(this.productoEnEdicion.id, this.productoEnEdicion).subscribe({
        next: (productoActualizado) => {
          const index = this.productos.findIndex(c => c.id === productoActualizado.id);
          if (index > -1) {
            this.productos[index] = productoActualizado;
          }
          alert('Producto actualizado con éxito!');
          this.resetFormulario(); // Limpia el formulario
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);
          this.mensajeError = 'Error al actualizar el producto. Verifica los datos.';
        }
      });
    } else { // Si no tiene ID, estamos creando
      this.productoService.crearProducto(this.productoEnEdicion).subscribe({
        next: (producto) => {
          this.productos.push(producto);
          alert('Producto creado con éxito!');
          this.resetFormulario(); // Limpia el formulario
        },
        error: (err) => {
          console.error('Error al crear producto:', err);
          this.mensajeError = 'Error al crear el producto. Verifica los datos.';
        }
      });
    }
  }

  seleccionarProductoParaEditar(producto: Producto): void {
    // Asignamos una copia del producto a productoEnEdicion para que el formulario lo muestre
    this.productoEnEdicion = { ...producto };
    this.productoSeleccionado = producto; // Mantenemos productoSeleccionado para el título del formulario y el botón Cancelar
    this.mensajeError = null;
  }

  eliminarProducto(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID del producto no definido para eliminar.');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.mensajeError = null;
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          this.productos = this.productos.filter(producto => producto.id !== id);
          alert('producto eliminado con éxito!');
          this.resetFormulario(); // Por si se estaba editando el producto que se eliminó
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
          this.mensajeError = 'Error al eliminar el producto. Es posible que esté asociado a un pedido.';
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.resetFormulario(); // Llama a la nueva función de reseteo
  }

  // Nueva función para resetear el formulario y el es
  resetFormulario(): void {
    this.productoEnEdicion = { nombre: '', descripcion: '', precio: 0, stock: 0};
    this.productoSeleccionado = null;
    this.mensajeError = null;
  }
}