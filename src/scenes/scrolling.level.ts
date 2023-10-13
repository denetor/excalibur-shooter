import {Actor, Axis, CollisionType, Color, Engine, Random, Scene, vec} from "excalibur";
import {PlayerActor} from "../actors/player/player.actor";
import {Resources} from "../resources";

/**
 * Livello con scrolling verticale
 */
export class ScrollingLevel extends Scene {
    player: PlayerActor;
    // boxes = [];

    onInitialize(engine: Engine): void {
        this.addSolidBackground(engine);
        this.addStars(engine);

        // add player
        this.player = new PlayerActor();
        this.player.pos = vec(engine.drawWidth / 2, engine.drawHeight /2);
        this.add(this.player);

        // make camera follow the player
        // this.camera.strategy.lockToActorAxis(this.player, Axis.Y);
        // this.camera.strategy.radiusAroundActor(this.player, engine.drawHeight /2);
        // this.camera.strategy.elasticToActor(this.player, 0.5, 0.5);
    }


    /**
     * Attach a solid background to the background
     *
     * @param engine
     * @private
     */
    private addSolidBackground(engine: Engine) {
        const bg = new Actor({
            x: 0,
            y: 0,
            width: engine.drawWidth,
            height: engine.drawHeight,
            color: Color.fromRGB(94,63,107),
        });
        bg.z = -99;
        bg.anchor = vec(0,0);
        this.add(bg);
    }

    /**
     * Add some stars to the level
     *
     * @param engine
     * @private
     */
    private addStars(engine: Engine) {
        const random = new Random(6159);
        const spriteSmall = Resources.StarSmall.toSprite();
        const spriteBig = Resources.StarBig.toSprite();
        for (let i = 0; i < 100; i++) {
            const star = new Actor({
                pos: vec(random.integer(0, engine.drawWidth), random.integer(0, engine.drawHeight) - i * 100),
            });
            star.z = -98;
            star.graphics.use(random.bool() ? spriteSmall : spriteBig);
            this.add(star);
        }
    }

}