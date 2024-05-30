import { Component, inject } from '@angular/core';
import { SalaService } from '../../services/sala.service';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-detalle-partida',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './detalle-partida.component.html',
  styleUrl: './detalle-partida.component.scss'
})
export class DetallePartidaComponent {
  salaService = inject(SalaService);

  vidas = new Array(3)

}
