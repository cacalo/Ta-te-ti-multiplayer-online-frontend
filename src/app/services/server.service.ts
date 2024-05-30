import { Injectable, inject } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { SalaJuego } from '../interfaces/sala';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  server = io(environment.SERVER_URL,{ autoConnect: false });
  actualizacionesDeSala$ = new Subject<SalaJuego>();
  router = inject(Router);

  constructor() {
    // this.server.onAny((args)=> console.log("Comunicación recibida",args));
    this.server.on('connection', server => {
      // console.log("CONECTADO")
    });
    this.server.on("sala",(sala:SalaJuego)=>{
      // console.log("Update sala",sala);
      this.actualizacionesDeSala$.next(sala)
    })
    this.server.on("disconnect", ()=> {
      this.router.navigate(["/"]);
      //console.log("Desconxión del back")
    })
    this.server.connect();
   }


}
