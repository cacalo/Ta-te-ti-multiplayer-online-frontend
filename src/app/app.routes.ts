import { Routes } from '@angular/router';
import { JugarComponent } from './pages/jugar/jugar.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"jugar/:idSala",
    component: JugarComponent
  },
  {
    path:"jugar",
    component: JugarComponent
  },
  {
    path:"jugar-privada",
    component: JugarComponent,
    data: {esPrivada:true}
  },
];
