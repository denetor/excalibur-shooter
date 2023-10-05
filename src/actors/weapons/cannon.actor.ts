import * as ex from "excalibur";
import {Actor, Engine, vec} from "excalibur";
import {SaucerActor} from "../enemies/saucer.actor";

export const CannonConstants = {
    speed: 500,
    damage: 50,
}

export class CannonActor extends Actor {
    public type = 'cannon';

    constructor() {
        super({
            radius: 4,
            color: ex.Color.Yellow,
            collisionType: ex.CollisionType.Passive,
        });
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);

        this.on('collisionstart', (evt) => {
            if (evt.other && (evt.other as any)?.type === 'saucer') {
                console.log({other: evt.other});
                (evt.other as SaucerActor).hit(CannonConstants.damage);
                evt.target.kill();
            }
        });
    }

    update(engine: Engine, delta: number) {
        super.update(engine, delta);
        if (this.pos.x === 0 || this.pos.y === 0 || this.pos.x >= engine.drawWidth || this.pos.y >= engine.drawHeight) {
            this.kill();
        }
    }

}