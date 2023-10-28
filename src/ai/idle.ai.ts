import {Clock, Random, Timer, Vector} from "excalibur";
import {Ai} from "./ai";
import {PatrolAi} from "./patrol.ai";
import {EntityActor} from "../actors/entity.actor";

/**
 * AI that stands still where it is
 */
export class IdleAi extends Ai {
    protected rnd: Random;
    protected lastRndRoll: number;
    protected rndTimer: Timer;



    constructor(actor: EntityActor) {
        super(actor);
        this.name = 'IdleAi';
        this.rnd = new Random(421);
        // at each iteration generate a random dice roll to decide what to do
        this.rndTimer = new Timer({
            fcn: () => {
                this.lastRndRoll = this.rnd.integer(0,10);
            },
            repeats: true,
            interval: 500,
        });
        this.actor.scene.add(this.rndTimer);
        this.rndTimer.start();
    }


    update() {
        if (this.actor) {
            this.actor.vel = Vector.Zero;
            // start patrolling only occasionally
            if (this.lastRndRoll === 0) {
                this.transitionTo(new PatrolAi(this.actor));
            }
        }
    }
}