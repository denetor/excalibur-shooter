import * as ex from 'excalibur';
import {ScenesService} from "../../services/scenes.service";
import {PlayerActor} from "../../actors/player/player.actor";

/**
 * Managed scene
 */
export class LevelOne extends ex.Scene {
  scenesService: ScenesService;
  player: PlayerActor;


  constructor(scenesService: ScenesService) {
    super();
    this.scenesService = scenesService;
  }


  public onInitialize(engine: ex.Engine) {
    // add player
    this.player = new PlayerActor();
    this.player.pos = ex.vec(engine.drawWidth / 2, engine.drawHeight /2);
    engine.currentScene.add(this.player);
  }

  public onActivate() {}
  public onDeactivate() {}
}
