import {Actor, Engine, Vector} from "excalibur";
import * as ex from "excalibur";


const SaucerConstants = {
    radius: 25,
}

export class SaucerActor extends Actor {


    constructor() {
        super({
            radius: SaucerConstants.radius,
            color: ex.Color.Gray,
        });
    }

    onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
    }

}