// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Asegúrate de que las rutas de importación de tus componentes sean correctas
import { ClienteComponent } from './cliente/cliente.component';
import { ProductoComponent } from './producto/producto.component';
import { PedidoComponent } from './pedido/pedido.component';

const routes: Routes = [
  // Redirige la ruta raíz ('/') a la interfaz de Clientes
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // Rutas para cada una de las interfaces de tu tienda
  { path: 'clientes', component: ClienteComponent }, // ¡Esta es la ruta crucial!
  { path: 'productos', component: ProductoComponent },
  { path: 'pedidos', component: PedidoComponent },
  // Ruta de comodín: para cualquier URL no reconocida, redirige a Clientes
  { path: '**', redirectTo: '/clientes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
