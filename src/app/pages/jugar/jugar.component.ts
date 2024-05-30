import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SalaService } from '../../services/sala.service';
import { TableroComponent } from "../../components/tablero/tablero.component";
import { DetallePartidaComponent } from "../../components/detalle-partida/detalle-partida.component";
import { UsuarioService } from '../../services/usuario.service';
import { ModalFullscreenComponent } from "../../components/modal-fullscreen/modal-fullscreen.component";
import { environment } from '../../../environments/environment';
import { EstadoJuego } from '../../interfaces/sala';
import { take } from 'rxjs';

@Component({
    selector: 'app-jugar',
    standalone: true,
    templateUrl: './jugar.component.html',
    styleUrl: './jugar.component.scss',
    imports: [CommonModule, RouterModule, TableroComponent, DetallePartidaComponent, ModalFullscreenComponent, UpperCasePipe]
})
export class JugarComponent {
  salaService = inject(SalaService);
  usuarioService = inject(UsuarioService)
  client_url = environment.CLIENT_URL;
  estadosConModal:EstadoJuego[] = ["VICTORIA_P1","VICTORIA_P2","VICTORIA_FINAL_P1","VICTORIA_FINAL_P2","EMPATE"]
  linkCopiado = signal(false);
  comienzaElJuego = computed(()=> 
    (this.salaService.estado() ==="TURNO_P1" || this.salaService.estado() ==="TURNO_P2") && this.animacionComienzaJuego()
  )
  animacionComienzaJuego = signal(true);
  ocultarMensajeInicial = effect( ()=> {
    if(this.comienzaElJuego()) {setTimeout(()=>{ this.animacionComienzaJuego.set(false);},1500)};
  },{allowSignalWrites:true})

  estadoAnterior= signal<EstadoJuego>("ESPERANDO_COMPAÑERO")
  /** Mantiene el estado anterior por unos segundos para que no desaparezca el texto de los modales fullscreen */
  cambiarEstadoAnteriorDiferido = effect(()=> {
    if(!this.estadosConModal.includes(this.salaService.estado())){
      console.log("retrasando el estado")
      setTimeout(()=>this.estadoAnterior.set(this.salaService.estado()),3000)
    }
  })

  constructor(private ar:ActivatedRoute, private router: Router){
    //if(!this.usuarioService.nombre()) router.navigate(["/"]);
    if(!this.usuarioService.nombre()){
      this.router.navigate([".."]);
    } else {
      ar.params.pipe(take(1)).subscribe(params => {
        if(params["idSala"]){
          // console.log("Debo entrar a una sala existente")
          this.salaService.unirseASala(params["idSala"]).then(res => {
            console.warn("Sala inexistente");
            if(!res) router.navigate(["/"])
          })
          return;
        } else {
          ar.data.pipe(take(1)).subscribe(data => {
            if(data && data['esPrivada']){
              // console.log("Debo crear una sala privada")
              this.salaService.crearSala(true)
            } else {
              // console.log("Debo crear una sala pública")
              this.salaService.crearSala()
            }
          })
        }
      })
    }
    
  }


  copiarLink(){
    navigator.clipboard.writeText(this.client_url+"jugar/"+this.salaService.id());
    this.linkCopiado.set(true);
    setTimeout(()=> this.linkCopiado.set(false),3000);
  }

}
