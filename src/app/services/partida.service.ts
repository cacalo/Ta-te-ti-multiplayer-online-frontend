import { Injectable, inject, signal } from '@angular/core';
//import { EstadoJuego, NombreJugador } from '../interfaces/estadoJuego';
//import { Ronda } from '../interfaces/ronda';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  // rondas: Ronda[] = []
  // estadoJuego = signal<EstadoJuego>("P1");
  // cantidadJugadores = signal<number>(2);
  // jugadorMano = signal<NombreJugador>("P1");
  // chatService = inject(ChatService);  

  // constructor() {
  //   this.nuevaRonda();
  // }

  // nuevaRonda(){

  // }

  // avanzarJugadorMano(){
  //   switch(this.estadoJuego()){
  //     case "P1":
  //       this.jugadorMano.set("P2");
  //       break;
  //     case "P2":
  //       this.jugadorMano.set("P1");
  //       break;
  //   }
  // }

  // avanzarEstadoJuego(){
  //   switch(this.estadoJuego()){
  //     case "P1":
  //       this.estadoJuego.set("P2");
  //       break;
  //     case "P2":
  //       this.estadoJuego.set("P1");
  //       break;
  //   }
  // }
}
