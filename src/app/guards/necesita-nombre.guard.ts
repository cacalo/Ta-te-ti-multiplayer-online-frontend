import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';

export const necesitaNombreGuard: CanActivateFn = (route, state) => {
  const usuario = inject(UsuarioService)
  
  if(usuario.nombre()) return true;
  
  const router = inject(Router);
  const idSala = route.params["idSala"];
  if(idSala){
    return router.navigate(["/cambiar-nombre",idSala]);
  }
  return router.navigate(["/cambiar-nombre"]);
};
