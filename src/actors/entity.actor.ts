import {Actor} from "excalibur";
import {Ai} from "../ai/ai";

/**
 * Generic base class of every actor
 */
export class EntityActor extends Actor {
    public type: string = 'entity';
    public hp: number;
    public ai: Ai;

    public setAi(ai: Ai): void {
        this.ai = ai;
    }

    public hit(hp: number): void {
        this.hp -= hp;
    }
}