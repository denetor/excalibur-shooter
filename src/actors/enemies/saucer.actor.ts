import {Actor, Engine, Timer, Vector} from "excalibur";
import * as ex from "excalibur";
import {CannonActor, CannonConstants} from "../weapons/cannon.actor";
import {EnemyCannonActor, EnemyCannonConstants} from "../weapons/enemy-cannon.actor";


const SaucerConstants = {
    radius: 25,
    maxSpeedX: 10,
    maxSpeedY: 50,
    hp: 100,
    fireInterval: 1000,
}

export class SaucerActor extends Actor {
    public type = 'saucer';
    private hp = SaucerConstants.hp;



    constructor() {
        super({
            radius: SaucerConstants.radius,
            color: ex.Color.Gray,
            collisionType: ex.CollisionType.Passive,
        });
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        this.vel.x = Math.random() * SaucerConstants.maxSpeedX * 2 - SaucerConstants.maxSpeedX;
        this.vel.y = Math.random() * SaucerConstants.maxSpeedY;

        // timer to shoot
        const fireTimer = new Timer({
            fcn: () => {
                this.fireCannon(engine);
            },
            repeats: true,
            interval: SaucerConstants.fireInterval,
        });
        engine.currentScene.add(fireTimer);
        fireTimer.start();
    }


    public hit(hp: number): void {
        this.hp -= hp;
        if (this.hp <= 0) {
            this.kill();
        }
    }


    /**
     * Fire a cannon ammo
     * @param engine
     */
    fireCannon(engine: Engine) {
        const cannon = new EnemyCannonActor();
        cannon.pos = ex.vec(this.pos.x, this.pos.y + 25);
        cannon.vel = ex.vec(0, EnemyCannonConstants.speed);
        engine.currentScene.add(cannon);
    }

}