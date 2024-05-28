import { Injectable, signal } from '@angular/core';
import { Mensaje } from '../interfaces/acciones';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  mensajes = signal<Mensaje[]>([]);

  constructor(){
    this.agregarMensaje({
      nombreJugador: 'Serve',
      accion: "unido",
      data: 'nadie'
    })
  }

  agregarMensaje(mensaje:Mensaje){
    this.mensajes.set([...this.mensajes(),mensaje])
    // console.log(this.mensajes())
  }
}
