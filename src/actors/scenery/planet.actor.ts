import {EntityActor} from "../entity.actor";
import {Resources} from "../../resources";
import { Engine, ParallaxComponent, vec } from "excalibur";

export class PlanetActor extends EntityActor {
    protected subType;

    constructor(subType: string) {
        super();
        this.type = 'planet';
        this.subType = subType;
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        const sprite = Resources[`Planet${this.subType}`].toSprite();
        this.graphics.use(sprite);
        this.z = -80;
        this.addComponent(new ParallaxComponent(vec(0.50, 0.50)));
    }
}