import {Engine} from "excalibur";
import {SaucerConstants} from "./saucer.actor";
import {IdleAi} from "../../ai/idle.ai";
import {EntityActor} from "../entity.actor";
import * as ex from "excalibur";
import { Resources } from "../../resources";
import {ExplosionService} from "../../services/explosion.service";
import {AmmoGemActor} from "../enhancements/ammo-gem.actor";
import {LifeGemActor} from "../enhancements/life-gem.actor";
import {GemService} from "../../services/gem.service";

export class SmartSaucerActor extends EntityActor {
    protected hp = SaucerConstants.hp;

    constructor() {
        super({
            collisionType: ex.CollisionType.Passive,
            collider: ex.Shape.Circle(SaucerConstants.radius),
        });
        this.type = 'smartsaucer';
    }


    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        // single sprite, rotating
        const sprite = Resources.Saucer.toSprite();
        sprite.destSize = {width: 40, height: 40};
        this.graphics.use(sprite);
        this.actions.repeatForever((ctx => {
            ctx.rotateTo(Math.PI, Math.PI / 2, ex.RotationType.CounterClockwise).rotateTo(Math.PI*2, Math.PI / 2, ex.RotationType.CounterClockwise);
        }));
        this.ai = new IdleAi(this);
    }


    update(engine: Engine, delta: number) {
        super.update(engine, delta);
        this.checkHp(engine);
        if (this.pos.x === 0 || this.pos.x >= engine.drawWidth || this.pos.y >= engine.drawHeight) {
            this.kill();
        }
    }

    checkHp(engine: Engine): void {
        if (this.hp <= 0) {
            ExplosionService.explode(engine, {pos: this.pos});
            GemService.cast(this);
            this.kill();
        }
    }
}