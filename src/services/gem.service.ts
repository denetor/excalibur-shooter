import {AmmoGemActor} from "../actors/enhancements/ammo-gem.actor";
import * as ex from "excalibur";
import {LifeGemActor} from "../actors/enhancements/life-gem.actor";
import { Actor } from "excalibur";

export class GemService {

    public static cast(actor: Actor): void {
        const dice = Math.random() * 100;
        if (dice <= 5) {
            const gem = new AmmoGemActor();
            gem.pos = ex.vec(actor.pos.x, actor.pos.y);
            actor.scene.add(gem);
        } else if (dice <= 10) {
            const gem = new LifeGemActor();
            gem.pos = ex.vec(actor.pos.x, actor.pos.y);
            actor.scene.add(gem);
        }
    }

}