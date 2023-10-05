import * as ex from "excalibur";
import {Actor, Engine, Timer, Vector } from "excalibur";
import {CannonActor, CannonConstants} from "../weapons/cannon.actor";

const PlayerConstants = {
  horizontalMaxSpeed: 500,
  horizontalSpeedIncrement: 25,
  verticalMaxSpeed: 500,
  verticalSpeedIncrement: 25,
};

export class PlayerActor extends Actor {
  public type = 'player';
  // actor shape, used for basic drawing and, in future, to manage collisions
  protected actorShape: Vector[];
  protected actorStatus = {
    cannon: {
      ammo: 100,
      fireInterval: 100,
      exceededRate: false,
    }
  };


  constructor() {
    super();
  }


  onInitialize(engine: Engine) {
    // actor shape
    this.actorShape = [ex.vec(-20, 20), ex.vec(0, -20), ex.vec(20, 20)];
    this.graphics.use(new ex.Polygon({
      points: this.actorShape,
      color: ex.Color.White,
    }));

    // timer to re-enable cannon fire (simulated max fire rate)
    const cannonRateTimer = new Timer({
      fcn: () => {
        this.actorStatus.cannon.exceededRate = false;
      },
      repeats: true,
      interval: this.actorStatus.cannon.fireInterval,
    });
    engine.currentScene.add(cannonRateTimer)
    cannonRateTimer.start()
  }


  update(engine: Engine, delta: number) {
    super.update(engine, delta);
    this.manageKeyboardInput(engine);
    this.checkScreenBoundaries(engine);
  }



  /**
   * Responds to user input
   */
  manageKeyboardInput(engine: Engine): void {
    if (engine.input.keyboard.isHeld(ex.Keys.ArrowRight)) {
      this.moveRight();
    }
    if (engine.input.keyboard.isHeld(ex.Keys.ArrowLeft)) {
      this.moveLeft();
    }
    if (engine.input.keyboard.isHeld(ex.Keys.ArrowUp)) {
      this.moveUp();
    }
    if (engine.input.keyboard.isHeld(ex.Keys.ArrowDown)) {
      this.moveDown();
    }
    if (engine.input.keyboard.isHeld(ex.Keys.Space)) {
      this.fireCannon(engine);
    }
  }


  /**
   * Keeps the actor into the screen boundaries
   */
  checkScreenBoundaries(engine: Engine): void {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = 0;
    }
    if (this.pos.x > engine.drawWidth) {
      this.pos.x = engine.drawWidth;
      this.vel.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = 0;
    }
    if (this.pos.y > engine.drawHeight) {
      this.pos.y = engine.drawHeight;
      this.vel.y = 0;
    }
  }


  /**
   * Fire a cannon ammo
   * @param engine
   */
  fireCannon(engine: Engine) {
    // fire only if ammo is available and limit fire rate
    if (this.actorStatus.cannon.ammo && !this.actorStatus.cannon.exceededRate) {
      const cannon = new CannonActor();
      cannon.pos = ex.vec(this.pos.x, this.pos.y - 25);
      cannon.vel = ex.vec(0, -CannonConstants.speed);
      engine.currentScene.add(cannon);
      this.actorStatus.cannon.ammo--;
      this.actorStatus.cannon.exceededRate = true;
    }
  }


  moveRight(): void {
    this.vel.x = Math.min(PlayerConstants.horizontalMaxSpeed, this.vel.x + PlayerConstants.horizontalSpeedIncrement);
  }
  moveLeft(): void {
    this.vel.x = Math.max(-PlayerConstants.horizontalMaxSpeed, this.vel.x - PlayerConstants.horizontalSpeedIncrement);
  }
  moveDown(): void {
    this.vel.y = Math.min(PlayerConstants.verticalMaxSpeed, this.vel.y + PlayerConstants.verticalSpeedIncrement);
  }
  moveUp(): void {
    this.vel.y = Math.max(-PlayerConstants.verticalMaxSpeed, this.vel.y - PlayerConstants.verticalSpeedIncrement);
  }

}
