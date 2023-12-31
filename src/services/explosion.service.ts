import * as ex from "excalibur";
import { Engine, ParticleEmitter, Timer } from "excalibur";

export class ExplosionService {


    public static explode(engine: Engine, options): void {
        const embersEmitter = new ParticleEmitter({
            radius: 15,
            minVel: 300,
            maxVel: 500,
            minAngle: 0,
            maxAngle: Math.PI * 2,
            emitRate: 100,
            opacity: 1,
            fadeFlag: true,
            particleLife: 120,
            beginColor: ex.Color.Yellow,
            endColor: new ex.Color(255,96, 96),
            maxSize: 3,
            minSize: 1,
        });
        embersEmitter.isEmitting = true;
        embersEmitter.pos = options.pos;
        const smokeEmitter = new ParticleEmitter({
            radius: 25,
            minVel: 10,
            maxVel: 75,
            minAngle: 0,
            maxAngle: Math.PI * 2,
            emitRate: 5,
            opacity: 0.5,
            fadeFlag: true,
            particleLife: 3000,
            maxSize: 75,
            minSize: 25,
        });
        smokeEmitter.color = ex.Color.White;
        smokeEmitter.isEmitting = true;
        smokeEmitter.pos = options.pos;
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


    public static explodeAsteroid(engine: Engine, options): void {
        const embersEmitter = new ParticleEmitter({
            radius: 50,
            minVel: 100,
            maxVel: 300,
            minAngle: 0,
            maxAngle: Math.PI * 2,
            emitRate: 10,
            opacity: 1,
            fadeFlag: true,
            particleLife: 300,
            beginColor: new ex.Color(139,69,19).darken(1),
            endColor: new ex.Color(139,69,19),
            maxSize: 10,
            minSize: 4,
        });
        embersEmitter.isEmitting = true;
        embersEmitter.pos = options.pos;
        engine.add(embersEmitter);
        const explosionTimer = new Timer({
            fcn: () => {
                embersEmitter.kill();
            },
            repeats: false,
            interval: 1000,
        });
        engine.currentScene.add(explosionTimer);
        explosionTimer.start();
    }
}