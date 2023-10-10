import * as ex from "excalibur";
import {Actor, CollisionType, Color, Engine, ParticleEmitter, PolygonCollider, Timer, Vector} from "excalibur";
import {CannonActor, CannonConstants} from "../weapons/cannon.actor";

const PlayerConstants = {
  horizontalMaxSpeed: 500,
  horizontalSpeedIncrement: 25,
  verticalMaxSpeed: 500,
  verticalSpeedIncrement: 25,
  hp: 100,
};

export class PlayerActor extends Actor {
  public type = 'player';


  // actor shape, used for basic drawing and, in future, to manage collisions
  protected actorShape: Vector[];

  // actor status, stored here
  protected actorStatus = {
    hp: PlayerConstants.hp,
    cannon: {
      ammo: 500,
      fireInterval: 100,
      exceededRate: false,
    }
  };


  constructor() {
    super({
      collisionType: CollisionType.Passive,
    });
  }


  onInitialize(engine: Engine) {
    // actor shape
    this.actorShape = [ex.vec(-20, 20), ex.vec(0, -20), ex.vec(20, 20)];
    this.collider.set(new PolygonCollider({points: this.actorShape}));
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
    engine.currentScene.add(cannonRateTimer);
    cannonRateTimer.start();
  }


  update(engine: Engine, delta: number) {
    super.update(engine, delta);
    this.checkHp(engine);
    this.manageKeyboardInput(engine);
    this.checkScreenBoundaries(engine);
  }


  /**
   * Take a certain amount of hp
   *
   * @param hp
   */
  public hit(hp: number): void {
    this.actorStatus.hp -= hp;
    this.actions.blink(150, 40, 3);
    this.scene.camera.shake(5, 5, 150);
  }


  /**
   * Give a certain amount of HP
   *
   * @param hp
   */
  public giveHp(hp: number): void {
    this.actorStatus.hp += hp;
  }


  /**
   * Give a certain amount of cannon ammo
   *
   * @param ammo
   */
  public giveCannonAmmo(ammo: number): void {
    this.actorStatus.cannon.ammo += ammo;
  }


  public getHp(): number {
    return this.actorStatus.hp;
  }
  public getCannonAmmo(): number {
    return this.actorStatus.cannon.ammo;
  }


  /**
   * Detect killed actor
   */
  checkHp(engine: Engine): void {
    if (this.actorStatus.hp <= 0) {
      this.createExplosionEmitter(engine);
      this.kill();
    }
  }


  createExplosionEmitter(engine: Engine) {
    const embersEmitter = new ParticleEmitter({
      radius: 15,
      minVel: 300,
      maxVel: 500,
      minAngle: 0,
      maxAngle: Math.PI * 2,
      emitRate: 50,
      opacity: 1,
      fadeFlag: true,
      particleLife: 500,
      beginColor: Color.Yellow,
      endColor: new Color(255,96, 96),
      maxSize: 5,
      minSize: 2,
    });
    embersEmitter.isEmitting = true;
    embersEmitter.pos = this.pos;
    const smokeEmitter = new ParticleEmitter({
      radius: 25,
      minVel: 10,
      maxVel: 75,
      minAngle: 0,
      maxAngle: Math.PI * 2,
      emitRate: 5,
      opacity: 0.5,
      fadeFlag: true,
      particleLife: 3500,
      maxSize: 75,
      minSize: 25,
    });
    smokeEmitter.color = ex.Color.White;
    smokeEmitter.isEmitting = true;
    smokeEmitter.pos = this.pos;
    engine.add(embersEmitter);
    engine.add(smokeEmitter);
    const explosionTimer = new Timer({
      fcn: () => {
        smokeEmitter.kill();
        embersEmitter.kill();
      },
      repeats: false,
      interval: 1000,
    });
    engine.currentScene.add(explosionTimer);
    explosionTimer.start();
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
