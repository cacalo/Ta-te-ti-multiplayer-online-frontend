export type Accion = 
  "jugado" |
  "unido" |
  "salido" |
  "aceptado" |
  "rechazado" |
  "error" | 
  "asignacionJugador"
;

export const tipoMensaje = {
  jugado: "jugado",
  unido: "unido",
  salido: "salido",
  aceptado: "aceptado",
  rechazado: "rechazado",
  error: "error",
  asignacionJugador: "asignacionJugador"
}

export interface Mensaje {
  nombreJugador: string
  accion: Accion
  data: string
}