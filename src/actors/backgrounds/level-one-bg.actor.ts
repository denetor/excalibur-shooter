import * as ex from "excalibur";
import {Actor, Engine, ParallaxComponent} from "excalibur";
import { Resources } from "../../resources";

export class LevelOneBgActor extends Actor {

    constructor(engine: Engine) {
        super({
            width: engine.drawWidth,
            height: engine.drawHeight * 2,
            x: engine.drawWidth / 2,
            y: engine.drawHeight /2,
            color: ex.Color.Black,
        });
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        const bgSprite = Resources.LevelOneBg.toSprite();
        bgSprite.destSize = {width: engine.drawWidth, height: engine.drawHeight * 2};
        this.graphics.use(bgSprite);
        this.vel = ex.vec(0, 10);
    }

}