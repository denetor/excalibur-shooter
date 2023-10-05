import {Actor, Engine, Vector} from "excalibur";
import * as ex from "excalibur";


const SaucerConstants = {
    radius: 25,
    maxSpeedX: 10,
    maxSpeedY: 50,
    hp: 100,
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

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
        this.vel.x = Math.random() * SaucerConstants.maxSpeedX * 2 - SaucerConstants.maxSpeedX;
        this.vel.y = Math.random() * SaucerConstants.maxSpeedY;
    }


    public hit(hp: number): void {
        this.hp -= hp;
        if (this.hp <= 0) {
            this.kill();
        }
    }

}