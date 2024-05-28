import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  nombre = signal<string>("");

  constructor() {
    const nombreLS = localStorage.getItem('nombre');
    if (nombreLS) {
      this.nombre.set(nombreLS);
    }
  }

  cambiarNombre(nombre: string) {
    this.nombre.set(nombre);
    localStorage.setItem('nombre', nombre);
  }
}
