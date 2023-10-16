import {Actor, Animation, CircleCollider, Engine, PolygonCollider, Random, SpriteSheet, Timer, Vector} from "excalibur";
import * as ex from "excalibur";
import {EnemyCannonActor, EnemyCannonConstants} from "../weapons/enemy-cannon.actor";
import {AmmoGemActor} from "../enhancements/ammo-gem.actor";
import {LifeGemActor} from "../enhancements/life-gem.actor";
import {Resources} from "../../resources";
import {ExplosionService} from "../../services/explosion.service";
import {EntityActor} from "../entity.actor";


const AsteroidConstants = {
    maxSpeedX: 20,
    maxSpeedY: 75,
    hpPerSize: 50,
}

export class AsteroidActor extends EntityActor {
    protected actorShape: Vector[];
    private size: number;
    private hp: number;



    constructor() {
        super({
            // radius: 50,
            color: ex.Color.Red,
            collisionType: ex.CollisionType.Passive,
        });
        this.type = 'asteroid';
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        const random = new Random(211);
        this.vel.x = random.integer(0, AsteroidConstants.maxSpeedX * 2 - AsteroidConstants.maxSpeedX);
        this.vel.y = random.integer(0, AsteroidConstants.maxSpeedY) + 50;

        // shape and collider
        this.size = random.integer(1,4);
        this.collider.set(new CircleCollider({
            radius: this.size * 20,
        }))
        const sprite = this.size <= 2 ? Resources.AsteroidSmall.toSprite() : Resources.AsteroidBig.toSprite();
        sprite.destSize = {
            width: this.size * 20,
            height: this.size * 20
        };
        this.graphics.use(sprite);
        this.actions.repeatForever((ctx => {
            ctx.rotateTo(Math.PI, Math.PI / this.size, ex.RotationType.CounterClockwise).rotateTo(Math.PI*2, Math.PI / this.size, ex.RotationType.CounterClockwise);
        }));

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
        if (this.hp <= 0) {
            ExplosionService.explodeAsteroid(engine, {pos: this.pos});
            this.kill();
        }
        if (this.pos.x === 0 || this.pos.x >= engine.drawWidth || this.pos.y >= engine.drawHeight) {
            this.kill();
        }
    }



    public hit(hp: number): void {
        this.hp -= hp;
    }

}