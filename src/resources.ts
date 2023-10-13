import { ImageSource } from 'excalibur';
import laserGreen from './images/laserGreen.png';
import laserRed from './images/laserRed.png';
import levelOneBg from './images/backgrounds/level-one.png';
import saucer from './images/saucer.png';



/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    LaserGreen: new ImageSource(laserGreen),
    LaserRed: new ImageSource(laserRed),
    LevelOneBg: new ImageSource(levelOneBg),
    Saucer: new ImageSource(saucer),
}

export { Resources }
