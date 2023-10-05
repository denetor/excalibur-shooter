import * as ex from "excalibur";
import {Actor, Engine, Vector } from "excalibur";

const PlayerConstants = {
  horizontalMaxSpeed: 500,
  horizontalSpeedIncrement: 25,
  verticalMaxSpeed: 500,
  verticalSpeedIncrement: 25,
};

export class Player extends Actor {
  // actor shape, used for basic drawing and, in future, to manage collisions
  protected actorShape: Vector[];

  constructor() {
    super();
  }


  onInitialize() {
    // actor shape
    this.actorShape = [ex.vec(-20, 20), ex.vec(0, -20), ex.vec(20, 20)];
    this.graphics.use(new ex.Polygon({
      points: this.actorShape,
      color: ex.Color.White,
    }));
  }


  update(engine: Engine, delta: number) {
    super.update(engine, delta);
    this.manageMovementInput(engine);
    this.checkScreenBoundaries(engine);
  }



  /**
   * Responds to user input
   */
  manageMovementInput(engine): void {
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


  /**
   * Keeps the actor into the screen boundaries
   */
  checkScreenBoundaries(engine): void {
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
