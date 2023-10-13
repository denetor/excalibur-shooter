import {Actor, CollisionType, Color, Engine} from "excalibur";
import { Resources } from "../../resources";

export const CannonConstants = {
    speed: 800,
    damage: 50,
}

export class CannonActor extends Actor {
    public type = 'cannon';

    constructor() {
        super({
            radius: 4,
            color: Color.Yellow,
            collisionType: CollisionType.Passive,
        });
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);

        const sprite = Resources.LaserRed.toSprite();
        sprite.destSize = {width: 3, height: 11};
        this.graphics.use(sprite);

        this.on('collisionstart', (evt) => {
            if (evt.other && (evt.other as any)?.type) {
                const targetType = (evt.other as any)?.type;
                // if some hittable actor has been hit
                if (['saucer'].some(element => element === targetType)) {
                    (evt.other as any).hit(CannonConstants.damage);
                    evt.target.kill();
                } else if (['asteroid'].some(element => element === targetType)) {
                    (evt.other as any).hit(CannonConstants.damage);
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