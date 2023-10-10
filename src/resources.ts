import { ImageSource } from 'excalibur';
import levelOneBg from './images/backgrounds/level-one.png';
import saucer from './images/saucer.png';
import sword from './images/sword.png';


/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    LevelOneBg: new ImageSource(levelOneBg),
    Saucer: new ImageSource(saucer),
    Sword: new ImageSource(sword),
}

export { Resources }
