import {Engine, SpriteSheet, Timer} from "excalibur";
import * as ex from "excalibur";
import {EnemyCannonActor, EnemyCannonConstants} from "../weapons/enemy-cannon.actor";
import {Resources} from "../../resources";
import {ExplosionService} from "../../services/explosion.service";
import {EntityActor} from "../entity.actor";
import {GemService} from "../../services/gem.service";


export const SaucerConstants = {
    radius: 40,
    maxSpeedX: 10,
    maxSpeedY: 100,
    hp: 100,
    fireInterval: 1000,
}

export class SaucerActor extends EntityActor {
    private fireTimer: Timer;
    private spriteSheet: SpriteSheet;



    constructor() {
        super({
            collisionType: ex.CollisionType.Passive,
            collider: ex.Shape.Circle(SaucerConstants.radius),
        });
        this.type = 'saucer';
        this.hp = SaucerConstants.hp;
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        this.vel.x = Math.random() * SaucerConstants.maxSpeedX * 2 - SaucerConstants.maxSpeedX;
        this.vel.y = Math.random() * SaucerConstants.maxSpeedY;

        // spritesheet
        // this.spriteSheet = SpriteSheet.fromImageSource({
        //     image: Resources.Saucer,
        //     grid: {
        //         rows: 1,
        //         columns: 3,
        //         spriteWidth: 79,
        //         spriteHeight: 79,
        //     },
        //     spacing: {
        //         margin: {x: 4, y: 0},
        //     }
        // });
        // const mainAnimation = Animation.fromSpriteSheet(this.spriteSheet, [0,1,2,1], 75);
        // this.graphics.add(mainAnimation);
        // this.graphics.use(mainAnimation);

        // single sprite, rotating
        const sprite = Resources.Saucer.toSprite();
        sprite.destSize = {width: 40, height: 40};
        this.graphics.use(sprite);
        this.actions.repeatForever((ctx => {
            ctx.rotateTo(Math.PI, Math.PI / 2, ex.RotationType.CounterClockwise).rotateTo(Math.PI*2, Math.PI / 2, ex.RotationType.CounterClockwise);
        }));

        // timer to shoot
        this.fireTimer = new Timer({
            fcn: () => {
                this.fireCannon();
            },
            repeats: true,
            interval: SaucerConstants.fireInterval,
        });
        engine.currentScene.add(this.fireTimer);
        this.fireTimer.start();
    }


    update(engine: Engine, delta: number) {
        super.update(engine, delta);
        this.checkHp(engine);
        if (this.pos.x === 0 || this.pos.x >= engine.drawWidth || this.pos.y >= engine.drawHeight) {
            this.fireTimer.stop();
            this.kill();
        }
    }



    public hit(hp: number): void {
        this.hp -= hp;
    }


    checkHp(engine: Engine): void {
        if (this.hp <= 0) {
            this.fireTimer.stop();
            ExplosionService.explode(engine, {pos: this.pos});
            GemService.cast(this);
            this.kill();
        }
    }


    /**
     * Fire a cannon ammo
     * @param engine
     */
    protected fireCannon() {
        const cannon = new EnemyCannonActor();
        cannon.pos = ex.vec(this.pos.x, this.pos.y + 25);
        cannon.vel = ex.vec(0, EnemyCannonConstants.speed);
        this.scene.add(cannon);
    }

}