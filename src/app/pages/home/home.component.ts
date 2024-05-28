import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, RouterModule, FormsModule],
})
export class HomeComponent {
  router:Router = inject(Router);
  usuario = inject(UsuarioService);
  server = inject(ServerService);

  irASala(id: string) {
    this.router.navigate(['jugar', id]);
  }

  buscarSalaPublica() {
    this.server.server.emitWithAck("encontrarSala").then(res => {
			// console.log("Sala pública encontrada:",res);
			if(res === null) this.router.navigate(["jugar"]);
			else this.router.navigate(["jugar",res]);
		})
  }
}
