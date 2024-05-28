import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ServerService } from './services/server.service';
import { BotoneraComponent } from "./components/botonera/botonera.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, BotoneraComponent]
})
export class AppComponent {
  title = 'Truco-online';
  server = inject(ServerService);
}
