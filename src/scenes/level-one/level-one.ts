import * as ex from 'excalibur';
import {ScenesService} from "../../services/scenes.service";
import {Player} from "../../actors/player/player";

/**
 * Managed scene
 */
export class LevelOne extends ex.Scene {
  scenesService: ScenesService;
  player: Player;


  constructor(scenesService: ScenesService) {
    super();
    this.scenesService = scenesService;
  }


  public onInitialize(engine: ex.Engine) {
    // add player
    this.player = new Player();
    this.player.pos = ex.vec(engine.drawWidth / 2, engine.drawHeight /2);
    engine.currentScene.add(this.player);
  }

  public onActivate() {}
  public onDeactivate() {}
}
