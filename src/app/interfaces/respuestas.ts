import { Accion } from "./acciones";
import { SalaJuego } from "./sala";

export interface AccionBasica {
  accion: Accion,
  [T:string]: string
}

export interface CrearSalaRespuesta {
  accion: "unido" | "error",
  sala:SalaJuego
}

export interface UnirseASalaRespuesta extends CrearSalaRespuesta {
}