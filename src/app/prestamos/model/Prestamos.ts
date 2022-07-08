import { Client } from "src/app/client/model/Client";
import { Game } from "src/app/game/model/Game";

export class Prestamos{
    id: number;
    game: Game;
    client: Client;
    dayIn: Date;
    dayOut: Date;
}