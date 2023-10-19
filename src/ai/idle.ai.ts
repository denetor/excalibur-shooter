import {Clock, Random, Vector} from "excalibur";
import {Ai} from "./ai";
import {PatrolAi} from "./patrol.ai";
import {EntityActor} from "../actors/entity.actor";

/**
 * AI that stands still where it is
 */
export class IdleAi extends Ai {
    protected rnd: Random;

    constructor(actor: EntityActor) {
        super(actor);
        this.rnd = new Random(421);
    }

    update() {
        console.log('IdleAi.update()');
        if (this.actor) {
            this.actor.vel = Vector.Zero;
            const randomN = this.rnd.integer(0,10);
            // start patrolling only occasionally
            if (randomN === 0) {
                this.transitionTo(new PatrolAi(this.actor));
            }
        }
    }
}