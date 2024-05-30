import { CanActivateFn, RedirectCommand, Router, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';

/** Guard que revisa que el usuario tenga un nombre asignado */
export const necesitaNombreGuard: CanActivateFn = (route, state) => {
  const usuario = inject(UsuarioService)
  
  if(usuario.nombre()) return true;
  
  const router = inject(Router);
  const idSala = route.params["idSala"];
  if(idSala){
    const urlTree: UrlTree = router.parseUrl('/cambiar-nombre/'+idSala);
    return new RedirectCommand(urlTree, { skipLocationChange: true });
  }
  const urlTree: UrlTree = router.parseUrl('/cambiar-nombre');
  return new RedirectCommand(urlTree, { skipLocationChange: true });
};
