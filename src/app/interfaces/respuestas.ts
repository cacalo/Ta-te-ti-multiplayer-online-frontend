import { SalaJuego } from "./sala";

export interface CrearSalaRespuesta {
  exito: boolean,
  sala:SalaJuego
}

export interface UnirseASalaRespuesta extends CrearSalaRespuesta {
}