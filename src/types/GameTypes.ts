export interface GameType {
    _id: string;
    titulo: string;
    autor: string;
    sinopsis: string;
    aporte_turismo: string;
    aporte_cultura: string;
    aporte_juventud: string;
    aporte_educacion: string;
    objetivo: string;
    desarrollo: string;
    condiciones: string;
    controles: string;
    caracteristicas: string;
    tecnologias: string;
    estilo: string;
    genero: string;
    game_assets: {
        game_images: string[] | [] | undefined;
        game_archive: string[] | [] | undefined;
    }
}