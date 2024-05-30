import { Routes } from '@angular/router';
import { JugarComponent } from './pages/jugar/jugar.component';
import { HomeComponent } from './pages/home/home.component';
import { NombreComponent } from './pages/nombre/nombre.component';
import { necesitaNombreGuard } from './guards/necesita-nombre.guard';

export const routes: Routes = [
  {
    path:"",
    component: HomeComponent,
    canActivate: [necesitaNombreGuard]
  },
  {
    path:"jugar/:idSala",
    component: JugarComponent,
    canActivate: [necesitaNombreGuard]
  },
  {
    path:"jugar",
    component: JugarComponent,
    canActivate: [necesitaNombreGuard]
  },
  {
    path:"jugar-privada",
    component: JugarComponent,
    data: {esPrivada:true},
    canActivate: [necesitaNombreGuard]
  },
  {
    path:"cambiar-nombre",
    component: NombreComponent,
  },
  {
    path:"cambiar-nombre/:idSala",
    component: NombreComponent
    },
];
