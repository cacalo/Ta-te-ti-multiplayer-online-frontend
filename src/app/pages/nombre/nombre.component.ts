import { Component, inject, signal } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nombre',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nombre.component.html',
  styleUrl: './nombre.component.scss'
})
export class NombreComponent {

  usuario = inject(UsuarioService);
  router = inject(Router);
  salaDestino = signal<number|undefined>(undefined);
  subs:Subscription[] = []

  constructor(private ar: ActivatedRoute){
    this.subs.push(ar.params.subscribe(params => {
      if(params["sala"]) this.salaDestino.set(parseInt(params["sala"]))
    }))
  }

  /** Guarda el nombre del jugador y lo lleva a la siguiente pantalla */
  guardarNombreYContinuar(nombre:string){
    this.usuario.cambiarNombre(nombre);
    if(this.salaDestino) this.router.navigate(["..","jugar",this.salaDestino])
    this.router.navigate([".."]);
  }
}
