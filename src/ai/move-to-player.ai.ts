import {Ai} from "./ai";
import {GeometryService} from "../services/geometry.service";
import {IdleAi} from "./idle.ai";
import {SaucerConstants} from "../actors/enemies/saucer.actor";
import {ScrollingLevel} from "../scenes/scrolling.level";

export const MoveToPlayerAiConstants = {
    radarDistance: 250,
    closeDistance: 80,
}

export class MoveToPlayerAi extends Ai {
    private status = null;

    constructor(actor) {
        super(actor);
        this.name = 'MoveToPlayerAi';
    }

    update() {
        const playerDistance = GeometryService.distance(this.actor.pos, (this.actor.scene as ScrollingLevel).player.pos);
        // if too far from player, transition to idle
        if (playerDistance > MoveToPlayerAiConstants.radarDistance) {
            this.transitionTo(new IdleAi(this.actor));
        }
        // if close to player, transition to firing
        else if (playerDistance < MoveToPlayerAiConstants.closeDistance) {
            // this.transitionTo(new ShootPlayerAi(this.actor));
        } else {
            // move towards player
            this.actor.actions.clearActions();
            this.actor.actions.moveTo((this.actor.scene as ScrollingLevel).player.pos, 100);
        }
    }
}