import {Actor, Engine, PolygonCollider, Vector} from "excalibur";
import * as ex from "excalibur";

export const AmmoGemConstants =  {
    ammo: 100,
};

export class AmmoGemActor extends Actor {
    public type = 'gem';
    protected actorShape: Vector[];


    constructor() {
        super({
            collisionType: ex.CollisionType.Passive,
        });
    }


    onInitialize(engine: Engine) {
        super.onInitialize(engine);

        // shape and collider
        this.actorShape = [ex.vec(0, -10), ex.vec(-5, 0), ex.vec(0, 10), ex.vec(5, 0)];
        this.collider.set(new PolygonCollider({points: this.actorShape}));
        this.graphics.use(new ex.Polygon({
            points: this.actorShape,
            color: ex.Color.Yellow,
        }));

        // collision management
        this.on('collisionstart', (evt) => {
            if (evt.other && (evt.other as any)?.type) {
                const targetType = (evt.other as any)?.type;
                // if some hittable actor has been hit
                if (['player'].some(element => element === targetType)) {
                    (evt.other as any).giveCannonAmmo(AmmoGemConstants.ammo);
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