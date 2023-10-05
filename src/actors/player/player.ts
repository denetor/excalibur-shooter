import * as ex from "excalibur";
import {Actor, Engine } from "excalibur";

const PlayerConstants = {
  horizontalMaxSpeed: 250,
  horizontalSpeedIncrement: 10,
  verticalMaxSpeed: 250,
  verticalSpeedIncrement: 10,
};

export class Player extends Actor {
  protected shape;

  constructor() {
    super({
      width: 25,
      height: 25,
      color: new ex.Color(255, 255, 255)
    });
  }

  onInitialize() {
    this.shape = [ex.vec(-20, 20), ex.vec(0, -20), ex.vec(20, 20)];
    this.graphics.use(new ex.Polygon({
      points: this.shape,
      color: ex.Color.White,
    }));
  }

  update(engine: Engine, delta: number) {
    super.update(engine, delta);
    // movement
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
