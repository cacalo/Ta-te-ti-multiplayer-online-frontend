import { Injectable, computed, inject, signal } from '@angular/core';
import { ServerService } from './server.service';
import { CrearSalaRespuesta, UnirseASalaRespuesta } from '../interfaces/respuestas';
import { CrearSalaArgs, EstadoJuego, SalaJuego, UnirseASalaArgs } from '../interfaces/sala';
import { UsuarioService } from './usuario.service';
import { ChatService } from './chat.service';
import { Jugador } from '../interfaces/jugador';
import { Marca, PosicionTablero } from '../interfaces/tablero';

@Injectable({
  providedIn: 'root',
})
export class SalaService {

  serverService = inject(ServerService);
  usuarioService = inject(UsuarioService);
  chatService = inject(ChatService);  

  id = signal<number | undefined>(undefined);
  numeroDeJugador = signal<1|2|undefined>(undefined);
  jugador1 = signal<Jugador | undefined>(undefined);
  jugador2 = signal<Jugador | undefined>(undefined);
  estado = signal<EstadoJuego>("ESPERANDO_COMPAÑERO");
  tablero = signal<[Marca,Marca,Marca,Marca,Marca,Marca,Marca,Marca,Marca]>(["","","","","","","","",""]);
  jugadorInicial = signal<1|2>(1);
  esPrivada = signal(false);

  //indexJugador = computed(()=> this.sala?.players.find(jugador => jugador.nombre === this.jugador.nombre()))

  constructor(){
    this.serverService.actualizacionesDeSala$.subscribe(nuevaSala =>{
      // console.log("Recibí una nueva sala del back",nuevaSala)
      this.desestructurarSalaBackendAFront(nuevaSala);
    })
  }

  /** Crea una nueva sala en backend y me une a ella */
  async crearSala(esPrivada:boolean = false) {
    // console.log('Creando Sala, mi nombre es',this.usuarioService.nombre());
    const args:CrearSalaArgs = {
      jugador: {
        nombre: this.usuarioService.nombre(),
        victorias: 0
      },
      esPrivada : esPrivada
    }
    const nuevaSala:CrearSalaRespuesta = await this.serverService.server.timeout(5000).emitWithAck("crearSala", args)
    // console.log("Sala creada")
    this.numeroDeJugador.set(1);
    //Propago la información inicial de la sala
    this.desestructurarSalaBackendAFront(nuevaSala.sala)
  }

  /** Desconecta a un usuario de los mensajes de la sala */
  async salirDeSala() {}

  /** Devuelve true si me uní a la sala */
  async unirseASala(id: number) {
    const args:UnirseASalaArgs = {
      salaId:id,
      jugador: {
        nombre: this.usuarioService.nombre(),
        victorias: 0
      }
    }
    const union:UnirseASalaRespuesta = await this.serverService.server.emitWithAck("unirseASala",args);
    // console.log(union.accion, union.accion==="unido")
    if(union.accion === "unido"){
      //Propago la información inicial de la sala
      if(union.sala.jugador1.nombre === this.usuarioService.nombre()) this.numeroDeJugador.set(1);
      else if(union.sala.jugador2.nombre === this.usuarioService.nombre()) this.numeroDeJugador.set(2);
      else console.error("Error al unirse a sala");
      this.desestructurarSalaBackendAFront(union.sala)
      // console.log("propagada la sala")
      return true
    }
    return false
  }

  jugar(posicion:PosicionTablero){
    this.serverService.server.emit("jugar", {
      salaId: this.id(),
      jugador: this.numeroDeJugador(),
      posicion
    });
  }

  nuevaRonda(){
    this.serverService.server.emit("nuevaRonda",this.id())
  }

  desestructurarSalaBackendAFront(salaBack:SalaJuego){
    // console.log("Desestructurando sala",salaBack)
    this.id.set(salaBack.id);
    this.jugador1.set(salaBack.jugador1);
    if(salaBack.jugador2.nombre) this.jugador2.set(salaBack.jugador2);
    this.jugadorInicial.set(salaBack.jugadorInicial);
    this.id.set(salaBack.id);
    this.estado.set(salaBack.estado);
    this.tablero.set(salaBack.tablero)
    this.esPrivada.set(salaBack.esPrivada);
    console.log(this.jugador1(),this.jugador2())
  }
}
