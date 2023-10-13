import {Actor, Axis, CollisionType, Color, Engine, Random, Scene, vec} from "excalibur";
import { DashboardActor } from "../actors/dashboard/dashboard.actor";
import {PlayerActor} from "../actors/player/player.actor";
import {Resources} from "../resources";
import {SaucerActor} from "../actors/enemies/saucer.actor";
import {AsteroidActor} from "../actors/enemies/asteroid.actor";

/**
 * Livello con scrolling verticale
 */
export class ScrollingLevel extends Scene {
    bg: Actor;
    player: PlayerActor;
    dashboard: DashboardActor;

    onInitialize(engine: Engine): void {
        this.addSolidBackground(engine);
        this.addStars(engine);

        // add player
        this.player = new PlayerActor();
        this.player.pos = vec(engine.drawWidth / 2, engine.drawHeight /2);
        this.add(this.player);

        // TODO fix dashboard
        // add dashboard
        this.dashboard = new DashboardActor();
        engine.currentScene.add(this.dashboard);

        // add test saucer
        const saucer = new SaucerActor();
        saucer.pos = vec(100, -500);
        engine.currentScene.add(saucer);

        // add test asteroid
        const ast1 = new AsteroidActor();
        ast1.pos = vec(300, -500);
        engine.currentScene.add(ast1);
    }

    onPostUpdate(engine: Engine, delta: number) {
        super.onPostUpdate(engine, delta);
        if (this.bg) {
            this.bg.pos = this.camera.pos;
        }
    }


    /**
     * Attach a solid background to the background.
     *
     * Background is a simple rectangle larger than the screen, always kept centered over the camera
     *
     * @param engine
     * @private
     */
    private addSolidBackground(engine: Engine) {
        this.bg = new Actor({
            width: engine.drawWidth * 2,
            height: engine.drawHeight * 2,
            color: Color.fromRGB(94,63,107),
        });
        this.bg.z = -99;
        this.add(this.bg);
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