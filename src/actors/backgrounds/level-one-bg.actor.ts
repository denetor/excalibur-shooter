import * as ex from "excalibur";
import {Actor, Engine} from "excalibur";
import { Resources } from "../../resources";

export class LevelOneBgActor extends Actor {

    constructor(engine: Engine) {
        super({
            width: engine.drawWidth,
            height: engine.drawHeight,
            x: engine.drawWidth / 2,
            y: engine.drawHeight /2,
            color: ex.Color.Black,
        });
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        const bgSprite = Resources.LevelOneBg.toSprite();
        bgSprite.destSize = {height: engine.drawHeight, width: engine.drawWidth};
        this.graphics.use(bgSprite);
    }
}