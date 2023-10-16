import {Ai} from "./ai";

export class MoveToPlayerAi extends Ai {
    radarDistance = 300;
    closeDistance: 80;

    update() {
        // if too far from player, transition to idle
        // if close to player, transition to firing
        // else
        // calculate player direction
        // set direction towards player
        // set speed to entity speed
    }
}