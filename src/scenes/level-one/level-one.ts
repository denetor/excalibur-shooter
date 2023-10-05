import * as ex from 'excalibur';
import {ScenesService} from "../../services/scenes.service";
import {PlayerActor} from "../../actors/player/player.actor";
import {Timer} from "excalibur";
import {SaucerActor} from "../../actors/enemies/saucer.actor";

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

    // timer to spawn saucers
    const saucerTimer = new Timer({
      fcn: () => {
        const saucer = new SaucerActor();
        saucer.pos = ex.vec(Math.random() * engine.drawWidth, Math.random() * 100);
        engine.currentScene.add(saucer);
      },
      repeats: true,
      interval: 1000,
    });
    engine.currentScene.add(saucerTimer);
    saucerTimer.start();
  }

  public onActivate() {}
  public onDeactivate() {}
}
