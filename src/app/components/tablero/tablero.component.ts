import { Component, computed, inject } from '@angular/core';
import { SalaService } from '../../services/sala.service';
import { PosicionTablero } from '../../interfaces/tablero';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.scss'
})
export class TableroComponent {

  salaService =inject(SalaService);

  tamaño = new Array(3);

  miTurno = computed(()=> {
    if(this.salaService.estado() === "TURNO_P1" && this.salaService.numeroDeJugador()===1) return true;
    if(this.salaService.estado() === "TURNO_P2" && this.salaService.numeroDeJugador()===2) return true;
    return false;
  })

  jugar(cuadro:PosicionTablero){
    this.salaService.jugar(cuadro)
  }
}
