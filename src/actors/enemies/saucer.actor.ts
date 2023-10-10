import {Actor, Animation, Engine, SpriteSheet, Timer, Vector} from "excalibur";
import * as ex from "excalibur";
import {EnemyCannonActor, EnemyCannonConstants} from "../weapons/enemy-cannon.actor";
import {AmmoGemActor} from "../enhancements/ammo-gem.actor";
import {LifeGemActor} from "../enhancements/life-gem.actor";
import {Resources} from "../../resources";


const SaucerConstants = {
    radius: 40,
    maxSpeedX: 10,
    maxSpeedY: 50,
    hp: 100,
    fireInterval: 1000,
}

export class SaucerActor extends Actor {
    public type = 'saucer';
    private hp = SaucerConstants.hp;
    private fireTimer: Timer;
    private spriteSheet: SpriteSheet;



    constructor() {
        super({
            collisionType: ex.CollisionType.Passive,
            collider: ex.Shape.Circle(SaucerConstants.radius),
        });
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        this.vel.x = Math.random() * SaucerConstants.maxSpeedX * 2 - SaucerConstants.maxSpeedX;
        this.vel.y = Math.random() * SaucerConstants.maxSpeedY * 2;

        // spritesheet
        this.spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.Saucer,
            grid: {
                rows: 1,
                columns: 3,
                spriteWidth: 79,
                spriteHeight: 79,
            },
            spacing: {
                margin: {x: 4, y: 0},
            }
        });
        const mainAnimation = Animation.fromSpriteSheet(this.spriteSheet, [1,2,3], 75);
        this.graphics.add(mainAnimation);
        this.graphics.use(mainAnimation);

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
        if (this.pos.x === 0 || this.pos.x >= engine.drawWidth || this.pos.y >= engine.drawHeight) {
            this.fireTimer.stop();
            this.kill();
        }
    }



    public hit(hp: number): void {
        this.hp -= hp;
        if (this.hp <= 0) {
            this.fireTimer.stop();
            this.castGem();
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


    protected castGem(): void {
        const dice = Math.random() * 100;
        if (dice <= 5) {
            const gem = new AmmoGemActor();
            gem.pos = ex.vec(this.pos.x, this.pos.y);
            this.scene.add(gem);
        } else if (dice <= 10) {
            const gem = new LifeGemActor();
            gem.pos = ex.vec(this.pos.x, this.pos.y);
            this.scene.add(gem);
        }
    }

}