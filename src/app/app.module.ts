import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Para hacer peticiones HTTP
import { FormsModule } from '@angular/forms'; // ¡IMPORTANTE! Asegúrate de importar FormsModule aquí

import { AppRoutingModule } from './app-routing.module'; // ¡Asegúrate de importar AppRoutingModule!
import { AppComponent } from 'src/app/app.component';
import { ClienteComponent } from 'src/app/cliente/cliente.component';
import { ProductoComponent } from './producto/producto.component';
import { PedidoComponent } from './pedido/pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent, // ¡Asegúrate de que este y los siguientes estén declarados!
    ProductoComponent,
    PedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // ¡Asegúrate de que AppRoutingModule esté aquí!
    HttpClientModule,
    FormsModule
  ],
  providers: [
    // Aquí irían tus servicios si no los provees en 'root' (providedIn: 'root')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
