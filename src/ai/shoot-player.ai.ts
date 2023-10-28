import {Timer, vec } from "excalibur";
import {EnemyCannonActor, EnemyCannonConstants} from "../actors/weapons/enemy-cannon.actor";
import { Ai } from "./ai";
import {GeometryService} from "../services/geometry.service";
import {ScrollingLevel} from "../scenes/scrolling.level";
import {SaucerConstants} from "../actors/enemies/saucer.actor";
import {MoveToPlayerAiConstants} from "./move-to-player.ai";
import {IdleAi} from "./idle.ai";

export class ShootPlayerAi  extends Ai {
    private fireTimer: Timer;

    constructor(actor) {
        super(actor);
        this.name = 'ShootPlayerAi';

        this.fireTimer = new Timer({
            fcn: () => {
                this.fireCannon();
            },
            repeats: true,
            interval: SaucerConstants.fireInterval,
        });
        actor.scene.add(this.fireTimer);
        this.fireTimer.start();
    }


    update() {
        const playerDistance = GeometryService.distance(this.actor.pos, (this.actor.scene as ScrollingLevel).player.pos);
        if (playerDistance > MoveToPlayerAiConstants.closeDistance) {
            this.transitionTo(new IdleAi(this.actor));
        }
    }

    fireCannon(): void {
        const angle = GeometryService.angle(this.actor.pos, (this.actor.scene as ScrollingLevel).player.pos);
        const cannon = new EnemyCannonActor();
        cannon.pos = vec(this.actor.pos.x, this.actor.pos.y + 25);
        cannon.vel = vec(0, EnemyCannonConstants.speed);
        cannon.rotation = angle;
        this.actor.scene.add(cannon);
    }
}