import * as ex from "excalibur";
import {Actor, Engine, vec} from "excalibur";

export const CannonConstants = {
    speed: 500,
}

export class CannonActor extends Actor {

    constructor() {
        super({
            radius: 4,
            color: ex.Color.Yellow,
        });
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
    }

    update(engine: Engine, delta: number) {
        super.update(engine, delta);
        if (this.pos.x === 0 || this.pos.y === 0 || this.pos.x >= engine.drawWidth || this.pos.y >= engine.drawHeight) {
            this.kill();
        }
    }

}