import { Component, inject, signal } from '@angular/core';
import { Mensaje } from '../../interfaces/acciones';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  chatService = inject(ChatService);

  /** Genera texto de chat para cada acción */
  accionATexto(mensaje:Mensaje){
    switch(mensaje.accion){
      case 'jugado':
        return `${mensaje.nombreJugador} jugó ${mensaje.data}`
      case 'unido':
        return `${mensaje.nombreJugador} se unió a la sala`
      case 'salido':
        return `${mensaje.nombreJugador} salió de la sala`
      case 'aceptado':
        return `${mensaje.nombreJugador} aceptó ${mensaje.data}`
      case 'rechazado':
        return `${mensaje.nombreJugador} rechazó ${mensaje.data}`
      case 'error':
        return `${mensaje.nombreJugador} ERROR ${mensaje.data}`
      case 'asignacionJugador':
        return `${mensaje.nombreJugador} juega como jugador Nº ${mensaje.data}`
    }
  }
}
