import * as ex from "excalibur";
import {Actor, Engine, vec} from "excalibur";

export const EnemyCannonConstants = {
    speed: 500,
    damage: 10,
}

export class EnemyCannonActor extends Actor {
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
            if (evt.other && (evt.other as any)?.type) {
                const targetType = (evt.other as any)?.type;
                // if some hittable actor has been hit
                if (['player'].some(element => element === targetType)) {
                    (evt.other as any).hit(EnemyCannonConstants.damage);
                    evt.target.kill();
                }
            }
        });
    }

    update(engine: Engine, delta: number) {
        super.update(engine, delta);
        // kill actor when goes out of the scene
        if (this.pos.x === 0 || this.pos.y === 0 || this.pos.x >= engine.drawWidth || this.pos.y >= engine.drawHeight) {
            this.kill();
        }
    }

}