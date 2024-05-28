import { SalaJuego } from "./sala";

export interface CrearSalaRespuesta {
  accion: "unido" | "error",
  sala:SalaJuego
}

export interface UnirseASalaRespuesta extends CrearSalaRespuesta {
}