import { Vector } from "excalibur";
import {Ai} from "./ai";

/**
 * AI that stands still where it is
 */
export class IdleAi extends Ai {

    update() {
        if (this.actor) {
            this.actor.vel = Vector.Zero;
        }
    }
}