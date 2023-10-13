import * as ex from "excalibur";
import {Actor, CollisionType, Color, Engine, ParticleEmitter, PolygonCollider, Timer, Vector} from "excalibur";
import {CannonActor, CannonConstants} from "../weapons/cannon.actor";
import {ExplosionService} from "../../services/explosion.service";

const PlayerConstants = {
  horizontalMaxSpeed: 500,
  horizontalSpeedIncrement: 25,
  verticalMaxSpeed: 500,
  verticalSpeedIncrement: 25,
  minSpeedY: 25,
  hp: 100,
  weight: 100,
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

    // collisions
    this.on('collisionstart', (evt) => {
      if (evt.other && (evt.other as any)?.type) {
        const targetType = (evt.other as any)?.type;
        // if some hittable actor has been hit
        if (['asteroid', 'saucer'].some(element => element === targetType)) {
          const collisionHp = this.getCollisionDamage();
          (evt.other as any).hit(collisionHp);
          this.hit(collisionHp);
        }
      }
    });
  }


  update(engine: Engine, delta: number) {
    super.update(engine, delta);
    this.checkHp(engine);
    this.manageKeyboardInput(engine);
    this.checkScreenBoundaries(engine);
    this.checkMinimumSpeed(engine);
    this.moveCamera(engine);
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


  /**
   * Returns the amount of HP inflicted to other actors when colliding.
   *
   * Damage is based on actor HPs and on actor speed*weight.
   */
  getCollisionDamage(): number {
    const speed = Math.trunc(Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y));
    const hpPerc = 1 - (PlayerConstants.hp - this.actorStatus.hp) / PlayerConstants.hp;
    return speed * hpPerc / 5;
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
      ExplosionService.explode(engine, {pos: this.pos});
      this.kill();
    }
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
    if (this.pos.y < this.scene.camera.y - engine.drawHeight/2) {
      this.pos.y = this.scene.camera.y - engine.drawHeight/2;
      //this.vel.y = 0;
    }
    if (this.pos.y > engine.drawHeight) {
      this.pos.y = this.scene.camera.y + engine.drawHeight/2;
      //this.vel.y = 0;
    }
  }


  /**
   * Maintains minimum scroll Y speed at a positive level
   *
   * @param engine
   */
  checkMinimumSpeed(engine: Engine): void {
    if (this.vel.y > -PlayerConstants.minSpeedY) {
      this.vel.y = -PlayerConstants.minSpeedY;
    }
  }

  moveCamera(engine: Engine): void {
    this.scene.camera.y = this.pos.y - engine.drawHeight/3;
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
