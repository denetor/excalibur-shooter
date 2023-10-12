import * as ex from 'excalibur';
import {ScenesService} from "../../services/scenes.service";
import {PlayerActor} from "../../actors/player/player.actor";
import {Engine, Timer} from "excalibur";
import {SaucerActor} from "../../actors/enemies/saucer.actor";
import {LevelOneBgActor} from "../../actors/backgrounds/level-one-bg.actor";
import {DashboardActor} from "../../actors/dashboard/dashboard.actor";
import {AmmoGemActor} from "../../actors/enhancements/ammo-gem.actor";
import {AsteroidActor} from "../../actors/enemies/asteroid.actor";

/**
 * Managed scene
 */
export class LevelOne extends ex.Scene {
  scenesService: ScenesService;
  bg: LevelOneBgActor;
  player: PlayerActor;
  dashboard: DashboardActor;


  constructor(scenesService: ScenesService) {
    super();
    this.scenesService = scenesService;
  }


  public onInitialize(engine: ex.Engine) {
    // add background
    this.bg = new LevelOneBgActor(engine);
    // this.bg.pos = ex.vec(engine.drawWidth / 2, engine.drawHeight /2);
    engine.currentScene.add(this.bg);

    // add player
    this.player = new PlayerActor();
    this.player.pos = ex.vec(engine.drawWidth / 2, engine.drawHeight /2);
    engine.currentScene.add(this.player);

    // add dashboard
    this.dashboard = new DashboardActor();
    engine.currentScene.add(this.dashboard);

    // timer to spawn saucers
    const saucerTimer = new Timer({
      fcn: () => {
        const saucer = new SaucerActor();
        saucer.pos = ex.vec(Math.random() * engine.drawWidth, 1);
        engine.currentScene.add(saucer);
      },
      repeats: true,
      interval: 1000,
    });
    engine.currentScene.add(saucerTimer);
    saucerTimer.start();

    // timer to spawn asteroids
    const asteroidTimer = new Timer({
      fcn: () => {
        const asteroid = new AsteroidActor();
        asteroid.pos = ex.vec(Math.random() * engine.drawWidth, 1);
        engine.currentScene.add(asteroid);
      },
      repeats: true,
      interval: 5000,
    });
    engine.currentScene.add(asteroidTimer);
    asteroidTimer.start();
  }

  onPreUpdate(engine: Engine, delta: number) {
    super.onPreUpdate(engine, delta);
    this.dashboard.setLife(this.player.getHp());
    this.dashboard.setAmmo(this.player.getCannonAmmo());
  }

  public onActivate() {}
  public onDeactivate() {}
}
