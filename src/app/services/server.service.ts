import { Injectable, inject } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { ChatService } from './chat.service';
import { SalaService } from './sala.service';
import { Observable, Subject } from 'rxjs';
import { SalaJuego } from '../interfaces/sala';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  server = io(environment.SERVER_URL,{ autoConnect: false });
  chatService = inject(ChatService);
  //salaService = inject(SalaService);
  actualizacionesDeSala$ = new Subject<SalaJuego>();

  constructor() {
    // this.server.onAny((args)=> console.log("Comunicación recibida",args));
    this.server.on('connection', server => {
      // console.log("CONECTADO")
    });
    this.server.on("asignacionJugador",(args)=>{
      // console.log("Nuevo jugador en la sala",args[0],args[1])
      this.chatService.agregarMensaje({
        nombreJugador: args[0],
        accion: "asignacionJugador",
        data: args[1]
      })
    })
    this.server.on("sala",(sala:SalaJuego)=>{
      // console.log("Update sala",sala);
      this.actualizacionesDeSala$.next(sala)
    })
    this.server.connect();
   }


}
