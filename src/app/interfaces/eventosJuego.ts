export interface EventosJuego{
  playerId: number,
  action: Accion
  data?: string
  timestamp: Date
}

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