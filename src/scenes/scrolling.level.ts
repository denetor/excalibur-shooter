import {Actor, Axis, CollisionType, Color, Engine, Scene, vec} from "excalibur";
import {PlayerActor} from "../actors/player/player.actor";

/**
 * Livello con scrolling verticale
 */
export class ScrollingLevel extends Scene {
    player: PlayerActor;
    boxes = [];

    onInitialize(engine: Engine): void {
        // add some random boxes as scenery
        for (let i = 0; i < 100; i++) {
            const box = new Actor({
                width: Math.trunc(Math.random() * 100),
                height: Math.trunc(Math.random() * 100),
                pos: vec(Math.trunc(Math.random()*engine.drawWidth), Math.trunc(Math.random()*engine.drawHeight) - i * 100),
                collisionType: CollisionType.Passive,
                color: Color.White,
            });
            this.boxes.push(box);
            this.add(box);
        }

        // add player
        this.player = new PlayerActor();
        this.player.pos = vec(engine.drawWidth / 2, engine.drawHeight /2);
        this.add(this.player);

        // make camera follow the player
        // this.camera.strategy.lockToActorAxis(this.player, Axis.Y);
        // this.camera.strategy.radiusAroundActor(this.player, engine.drawHeight /2);
        // this.camera.strategy.elasticToActor(this.player, 0.5, 0.5);
    }

}