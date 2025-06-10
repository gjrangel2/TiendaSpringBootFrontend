// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // El selector que se usa en index.html (<app-root></app-root>)
  templateUrl: './app.component.html', // Ruta al archivo HTML de esta plantilla
  styleUrls: ['./app.component.css'] // Ruta al archivo CSS/SCSS de esta plantilla
})
export class AppComponent {
  title = 'tienda-app'; // Una propiedad de ejemplo, puedes eliminarla si no la usas
}
