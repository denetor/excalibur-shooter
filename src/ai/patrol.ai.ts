import {EasingFunctions, vec, Vector} from "excalibur";
import {Ai} from "./ai";
import {IdleAi} from "./idle.ai";
import {EntityActor} from "../actors/entity.actor";
import {GeometryService} from "../services/geometry.service";
import {SaucerConstants} from "../actors/enemies/saucer.actor";
import {MoveToPlayerAi, MoveToPlayerAiConstants} from "./move-to-player.ai";
import {ScrollingLevel} from "../scenes/scrolling.level";

/**
 * AI that makes the actor walk left and right patrolling the field
 */
export class PatrolAi extends Ai {
    private status = null;


    constructor(actor) {
        super(actor);
        this.name = 'PatrolAi';
    }



    update() {
        if (this.actor && this.actor.scene && this.actor.scene.engine) {
            const targetLeft = vec(this.actor.width, this.actor.pos.y);
            const targetRight = vec(this.actor.scene.engine.drawWidth - this.actor.width, this.actor.pos.y);
            const adjustFirstLegTiming = (targetRight.x - this.actor.pos.x) / (targetRight.x - targetLeft.x);
            // if in proximity of player, move towards player
            if (GeometryService.distance(this.actor.pos, (this.actor.scene as ScrollingLevel).player.pos) < MoveToPlayerAiConstants.radarDistance) {
                this.transitionTo(new MoveToPlayerAi(this.actor))
            }
            // keep partolling
            if (!this.status) {
                this.status = 'patrolling';
                this.actor.actions.clearActions();
                this.actor.actions
                    .easeTo(targetRight, 5000 * adjustFirstLegTiming, EasingFunctions.EaseInOutQuad)
                    .delay(500)
                    .easeTo(targetLeft, 5000, EasingFunctions.EaseInOutQuad)
                    .delay(500)
                    .callMethod(() => {
                        // when patrolled, return idling
                        this.transitionTo(new IdleAi(this.actor));
                    });
            }
        }
    }
}