import {Actor, Axis, CollisionType, Color, Engine, Random, Scene, vec} from "excalibur";
import { DashboardActor } from "../actors/dashboard/dashboard.actor";
import {PlayerActor} from "../actors/player/player.actor";
import {Resources} from "../resources";
import {SaucerActor} from "../actors/enemies/saucer.actor";
import {AsteroidActor} from "../actors/enemies/asteroid.actor";
import {TestLevel} from "../levels/test.level";
import {SmartSaucerActor} from "../actors/enemies/smart-saucer.actor";

/**
 * Livello con scrolling verticale
 */
export class ScrollingLevel extends Scene {
    bg: Actor;
    player: PlayerActor;
    dashboard: DashboardActor;
    levelData: any;

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
        this.dashboard.pos.x = this.dashboard.width / 2 + this.dashboard.width / 10;
        engine.currentScene.add(this.dashboard);

        // actors to be spawned
        this.levelData = TestLevel;
    }

    onPostUpdate(engine: Engine, delta: number) {
        super.onPostUpdate(engine, delta);

        // update dashboard
        this.dashboard.setLife(this.player.getHp());
        this.dashboard.setAmmo(this.player.getCannonAmmo());

        // "fixed" background and dashboard following camera
        if (this.bg) {
            this.bg.pos = this.camera.pos;
        }
        if (this.dashboard) {
            this.dashboard.pos.y = this.camera.y - engine.drawHeight / 2 - this.dashboard.height;
        }

        // check for spawning actors
        if (this?.levelData?.actors) {
            for (const actor of this.levelData.actors) {
                if (actor && actor?.y && actor?.spawned == undefined && this?.levelData?.cell?.y && (-1 * engine.currentScene.camera.y) >= actor.y * this.levelData.cell.y) {
                    switch (actor?.type) {
                        case 'saucer':
                            const saucer = new SaucerActor();
                            saucer.pos = vec(actor.x * this.levelData.cell.x, -1 * actor.y * this.levelData.cell.y - engine.drawHeight);
                            engine.currentScene.add(saucer);
                            break;
                        case 'smartsaucer':
                            const smartSaucer = new SmartSaucerActor();
                            smartSaucer.pos = vec(actor.x * this.levelData.cell.x, -1 * actor.y * this.levelData.cell.y - engine.drawHeight);
                            engine.currentScene.add(smartSaucer);
                            break;
                        case 'asteroid':
                            const asteroid = new AsteroidActor();
                            asteroid.pos = vec(actor.x * this.levelData.cell.x, -1 * actor.y * this.levelData.cell.y - engine.drawHeight);
                            engine.currentScene.add(asteroid);
                            break;
                    }
                    actor.spawned = true;
                }
            }
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