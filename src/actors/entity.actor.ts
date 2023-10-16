import {Actor} from "excalibur";
import {Ai} from "../ai/ai";

/**
 * Generic base class of every actor
 */
export class EntityActor extends Actor {
    public type: string = 'entity';
    protected ai: Ai;

    setAi(ai: Ai): void {
        this.ai = ai;
    }
}