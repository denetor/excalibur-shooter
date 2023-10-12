import {Actor, Animation, Engine, PolygonCollider, SpriteSheet, Timer, Vector} from "excalibur";
import * as ex from "excalibur";
import {EnemyCannonActor, EnemyCannonConstants} from "../weapons/enemy-cannon.actor";
import {AmmoGemActor} from "../enhancements/ammo-gem.actor";
import {LifeGemActor} from "../enhancements/life-gem.actor";
import {Resources} from "../../resources";


const AsteroidConstants = {
    maxSpeedX: 20,
    maxSpeedY: 75,
    hpPerSize: 50,
}

export class AsteroidActor extends Actor {
    public type = 'asteroid';
    protected actorShape: Vector[];
    private size: number;
    private hp: number;



    constructor() {
        super({
            // radius: 50,
            color: ex.Color.Red,
            collisionType: ex.CollisionType.Passive,
        });
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        this.vel.x = Math.random() * AsteroidConstants.maxSpeedX * 2 - AsteroidConstants.maxSpeedX;
        this.vel.y = Math.random() * AsteroidConstants.maxSpeedY + 50;

        // shape and collider
        this.size = Math.random()*4 +1;
        this.actorShape = [
            ex.vec(0, -10*this.size),
            ex.vec(-7*this.size, -7*this.size),
            ex.vec(-8*this.size, 0),
            ex.vec(-10*this.size, 0),
            ex.vec(-5*this.size, 12*this.size),
            ex.vec(0, 13*this.size),
            ex.vec(10*this.size, 5),
            ex.vec(8*this.size, 0),
            ex.vec(4*this.size, -4*this.size),
            ex.vec(3*this.size, -9*this.size),
            ex.vec(0, -10*this.size),
        ];
        this.collider.set(new PolygonCollider({points: this.actorShape}));
        this.graphics.use(new ex.Polygon({
            points: this.actorShape,
            color: new ex.Color(139,69,19),
        }));
        this.actions.rotateBy(Math.PI*2, Math.PI / 2, ex.RotationType.CounterClockwise);

        // stats
        this.hp = AsteroidConstants.hpPerSize * this.size;

        // collision
        this.on('collisionstart', (evt) => {
            if (evt.other && (evt.other as any)?.type) {
                const targetType = (evt.other as any)?.type;
                // if some hittable actor has been hit
                if (['asteroid', 'saucer'].some(element => element === targetType)) {
                    (evt.other as any).hit(this.hp);
                    this.hit(AsteroidConstants.hpPerSize);
                }
            }
        });
    }


    update(engine: Engine, delta: number) {
        super.update(engine, delta);
        if (this.pos.x === 0 || this.pos.x >= engine.drawWidth || this.pos.y >= engine.drawHeight) {
            this.kill();
        }
    }



    public hit(hp: number): void {
        this.hp -= hp;
        if (this.hp <= 0) {
            this.kill();
        }
    }

}